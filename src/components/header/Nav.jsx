import { NavLink } from "react-router-dom"
import { useStatus } from "../helpers/customHooks/useStatus"
import { useEffect } from "react"
import AvailableChats from "../chats/AvailableChats"

import style from './style.module.css'

const Nav = () => {
    const { isAuth } = useStatus()

    useEffect(() => {

    }, [])

    return (
        <nav className={style.mainNav}>
            <div>
                {/* logo */}

                {isAuth &&
                    <NavLink to={'/search'}>Search</NavLink>
                }
            </div>
            {isAuth
                ? <>
                    <div className={style.centerNav}>
                        <NavLink to={'/'}>Home</NavLink>
                    </div>

                    <div className={style.rightNav}>
                        <AvailableChats />
                        <NavLink to={'/profile'}>Profile</NavLink>
                        <NavLink to={'/logout'} >Logout</NavLink>
                    </div>
                </>
                : <div className={style.rightNav}>
                    <NavLink to={'/register'}>Register</NavLink>
                    <NavLink to={'/login'}>Login</NavLink>
                </div>
            }
        </nav>
    )
}

export default Nav