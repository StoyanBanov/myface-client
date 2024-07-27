import { NavLink } from "react-router-dom"
import { useStatus } from "../helpers/customHooks/useStatus"
import { useEffect } from "react"
import AvailableChats from "../chats/AvailableChats"

import style from './style.module.css'
import commonStyle from '../helpers/commonStyle.style.module.css'

const Nav = () => {
    const { isAuth } = useStatus()

    useEffect(() => {

    }, [])

    const ActiveClassNameHandler = ({ isActive }) => isActive ? commonStyle.activeLink : commonStyle.inactiveLink

    return (
        <nav className={style.mainNav}>
            <div>
                {/* logo */}

                {isAuth &&
                    <NavLink className={ActiveClassNameHandler} to={'/search'}>Search</NavLink>
                }
            </div>
            {isAuth
                ? <>
                    <div className={style.centerNav}>
                        <NavLink className={ActiveClassNameHandler} to={'/'}>Home</NavLink>
                    </div>

                    <div className={style.rightNav}>
                        <AvailableChats />
                        <NavLink className={ActiveClassNameHandler} to={'/profile'}>Profile</NavLink>
                        <NavLink className={ActiveClassNameHandler} to={'/logout'} >Logout</NavLink>
                    </div>
                </>
                : <div className={style.rightNav}>
                    <NavLink className={ActiveClassNameHandler} to={'/register'}>Register</NavLink>
                    <NavLink className={ActiveClassNameHandler} to={'/login'}>Login</NavLink>
                </div>
            }
        </nav>
    )
}

export default Nav