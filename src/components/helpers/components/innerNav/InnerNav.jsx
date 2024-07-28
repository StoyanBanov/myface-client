import { NavLink } from 'react-router-dom'
import commonStyle from '../../commonStyle.style.module.css'
import style from './style.module.css'

const InnerNav = ({ links }) => {

    const ActiveClassNameHandler = ({ isActive }) => isActive ? commonStyle.activeLink : commonStyle.inactiveLink
    return (
        <div className={style.searchNav}>
            {links.map(l =>
                <NavLink key={l.text} className={ActiveClassNameHandler} to={l.to}>{l.text}</NavLink>
            )}
        </div>
    )
}

export default InnerNav