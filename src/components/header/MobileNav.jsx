import style from './style.module.css'
import commonStyle from '../helpers/commonStyle.style.module.css'
import { NavLink } from 'react-router-dom'
import AvailableChats from '../chats/AvailableChats'


const MobileNav = ({ isAuth, search, onSearchSubmit, onSearchChange }) => {
    const ActiveClassNameHandler = ({ isActive }) => isActive ? commonStyle.activeLink : commonStyle.inactiveLink

    return (
        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {isAuth
                    ? <>
                        <>
                            <NavLink className={ActiveClassNameHandler} to={'/'}>Home</NavLink>
                            <NavLink className={ActiveClassNameHandler} to={'/create/post'}>Create</NavLink>
                            <AvailableChats />
                            <NavLink className={ActiveClassNameHandler} to={'/profile'}>Profile</NavLink>
                            <NavLink className={ActiveClassNameHandler} to={'/logout'} >Logout</NavLink>
                        </>
                    </>
                    : <>
                        <NavLink className={ActiveClassNameHandler} to={'/register'}>Register</NavLink>
                        <NavLink className={ActiveClassNameHandler} to={'/login'}>Login</NavLink>
                    </>
                }
            </div>

            <div style={{ margin: 5 }}>
                {/* logo */}

                {isAuth &&
                    <form onSubmit={onSearchSubmit}>
                        <input type="text" name="search" value={search} onChange={onSearchChange} />
                    </form>
                }
            </div>
        </nav>
    )
}

export default MobileNav