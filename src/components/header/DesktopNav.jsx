import style from './style.module.css'
import commonStyle from '../helpers/commonStyle.style.module.css'
import { NavLink } from 'react-router-dom'
import AvailableChats from '../chats/AvailableChats'

const DesktopNav = ({ isAuth, search, onSearchSubmit, onSearchChange }) => {
    const ActiveClassNameHandler = ({ isActive }) => isActive ? commonStyle.activeLink : commonStyle.inactiveLink

    return (
        <nav className={style.mainNav}>
            <div>
                {/* logo */}

                {isAuth &&
                    <form onSubmit={onSearchSubmit}>
                        <input type="text" name="search" value={search} onChange={onSearchChange} />
                    </form>
                }
            </div>
            {isAuth
                ? <>
                    <div className={style.centerNav}>
                        <NavLink className={ActiveClassNameHandler} to={'/'}>Home</NavLink>
                        <NavLink className={ActiveClassNameHandler} to={'/create/post'}>Create</NavLink>
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

export default DesktopNav