import { useSelector } from "react-redux"

import style from './style.module.css'
import UserCard from "./UserCard"

const UsersList = () => {
    const users = useSelector(state => state.entities.users.list)

    return (
        <ul className={style.usersUl}>
            {users.map(u => <li key={u._id}><UserCard user={u} /></li>)}
        </ul>
    )
}

export default UsersList