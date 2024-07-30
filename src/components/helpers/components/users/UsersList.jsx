import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { clearUsers } from "../../../../store/users"
import UserCard from "./UserCard"

import style from './style.module.css'


const UsersList = ({ getUsersActionCreator }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersActionCreator())

        return () => {
            dispatch(clearUsers())
        }
    }, [dispatch, getUsersActionCreator])

    const { list, loading } = useSelector(state => state.entities.users)

    const usersUlRef = useRef()

    const onScroll = () => {
        const ul = usersUlRef.current

        if (!loading && ul.scrollTop == ul.scrollHeight - ul.clientHeight) {
            dispatch(getUsersActionCreator())
        }
    }

    return (
        <ul ref={usersUlRef} onScroll={onScroll} className={style.usersUl}>
            {list.map(u => <li key={u._id}><UserCard user={u} /></li>)}
        </ul>
    )
}

export default UsersList