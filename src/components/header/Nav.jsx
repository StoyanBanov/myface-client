import { NavLink } from "react-router-dom"
import { useStatus } from "../helpers/customHooks/useStatus"
import { useEffect } from "react"
import AvailableChats from "../chats/AvailableChats"

const Nav = () => {
    const { isAuth } = useStatus()

    useEffect(() => {

    }, [])

    return (
        <nav>
            <ul>
                <NavLink to={'/'}>Home</NavLink>

                {isAuth
                    ? <>
                        <NavLink to={'/search'}>Search</NavLink>

                        <AvailableChats />

                        <NavLink to={'/profile'}>Profile</NavLink>

                        <NavLink to={'/logout'} >Logout</NavLink>
                    </>
                    : <>
                        <NavLink to={'/register'}>Register</NavLink>
                        <NavLink to={'/login'}>Login</NavLink>
                    </>
                }
            </ul>
        </nav >
    )
}

export default Nav