import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { clearUsers } from "../../store/users"
import UserCard from "./UserCard"
import { useScroll } from "../helpers/customHooks/useScroll"
import NoMoreContent from "../helpers/components/loading/NoMoreContent"

import style from './style.module.css'

const UsersList = ({ getUsersActionCreator }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersActionCreator())

        return () => {
            dispatch(clearUsers())
        }
    }, [dispatch, getUsersActionCreator])

    const { list, hasReceivedAll, loading } = useSelector(state => state.entities.users)

    useScroll(loading, hasReceivedAll, getUsersActionCreator)

    return (
        <>
            <ul className={style.usersUl}>
                {list.map(u => <li key={u._id}><UserCard user={u} /></li>)}

                {loading &&
                    new Array(5).fill(0).map((_, i) =>
                        <li key={i} className={style.userCardContainer} style={{ height: '20vh', width: '15vh' }}>
                        </li>
                    )
                }
            </ul>

            {hasReceivedAll &&
                <NoMoreContent contentType={'users'} />
            }
        </>
    )
}

export default UsersList