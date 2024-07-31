import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { clearUsers } from "../../store/users"
import UserCard from "./UserCard"

import style from './style.module.css'
import { useScroll } from "../helpers/customHooks/useScroll"


const UsersList = ({ getUsersActionCreator }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersActionCreator())

        return () => {
            dispatch(clearUsers())
        }
    }, [dispatch, getUsersActionCreator])

    const { list, loading } = useSelector(state => state.entities.users)

    useScroll(loading, getUsersActionCreator)

    return (
        <ul className={style.usersUl}>
            {list.map(u => <li key={u._id}><UserCard user={u} /></li>)}
        </ul>
    )
}

export default UsersList