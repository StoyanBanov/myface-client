import { NavLink, Outlet } from "react-router-dom"
import { CDN_AVATAR_ADDRESS, CDN_DEFAULT_AVATAR_NAME_FEMALE, CDN_DEFAULT_AVATAR_NAME_MALE } from "../../constants"

import style from './style.module.css'
import commonStyle from '../helpers/commonStyle.style.module.css'

const ActiveClassNameHandler = ({ isActive }) => isActive ? commonStyle.activeLink : commonStyle.inactiveLink

const Profile = ({ user }) => {
    console.log(user);
    return (
        <>
            <img src={
                `${CDN_AVATAR_ADDRESS}/${user.profilePic
                || (user.gender == 'male'
                    ? CDN_DEFAULT_AVATAR_NAME_MALE
                    : CDN_DEFAULT_AVATAR_NAME_FEMALE)
                }`
            } />

            <div>
                <NavLink className={ActiveClassNameHandler} to={'/profile/friends'}>Friends</NavLink>
                <NavLink className={ActiveClassNameHandler} to={'/profile/posts'}>Posts</NavLink>
                <NavLink className={ActiveClassNameHandler} to={'/profile/edit'}>Edit</NavLink>
                <NavLink className={ActiveClassNameHandler} to={'/profile/settings'}>Settings</NavLink>
            </div>

            <Outlet context={{ user }} />
        </>
    )
}

export default Profile