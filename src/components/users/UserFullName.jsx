import { useNavigateToUser } from "../helpers/customHooks/useNavigateToUser"

import style from './style.module.css'

const UserFullName = ({ user }) => {
    return (
        <h3 className={style.fullName} onClick={useNavigateToUser(user._id)}>{user.fname} {user.lname}</h3>
    )
}

export default UserFullName