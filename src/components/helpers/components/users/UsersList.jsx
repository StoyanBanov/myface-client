import { useDispatch, useSelector } from "react-redux"

import style from './style.module.css'
import UserCard from "./UserCard"
import { useEffect } from "react"
import { clearUsers } from "../../../../store/users"

const UsersList = ({ getUsersActionCreator }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersActionCreator())

        return () => {
            dispatch(clearUsers())
        }
    }, [dispatch, getUsersActionCreator])

    const users = useSelector(state => state.entities.users.list)

    return (
        <ul className={style.usersUl}>
            {users.map(u => <li key={u._id}><UserCard user={u} /></li>)}
        </ul>
    )
}

export default UsersList