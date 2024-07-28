import { NavLink, useNavigate, useSearchParams } from "react-router-dom"
import { useStatus } from "../helpers/customHooks/useStatus"
import { useEffect, useState } from "react"
import AvailableChats from "../chats/AvailableChats"

import style from './style.module.css'
import commonStyle from '../helpers/commonStyle.style.module.css'

const Nav = () => {
    const { isAuth } = useStatus()

    const [search, setSearch] = useState('')

    const [searchParams] = useSearchParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (searchParams.has('search')) {
            setSearch(searchParams.get('search'))
        }
    }, [searchParams])

    const onSearchChange = e => {
        setSearch(e.target.value)
    }

    const onSearchSubmit = e => {
        e.preventDefault()

        navigate('/search/users?search=' + search)
    }

    const ActiveClassNameHandler = ({ isActive }) => isActive ? commonStyle.activeLink : commonStyle.inactiveLink

    return (
        <nav className={style.mainNav}>
            <div>
                {/* logo */}

                {isAuth &&
                    <form style={{ zIndex: 5 }} onSubmit={onSearchSubmit}>
                        <input type="text" name="search" value={search} onChange={onSearchChange} />
                    </form>
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