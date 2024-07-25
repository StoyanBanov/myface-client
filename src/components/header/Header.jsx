import Nav from "./Nav"

import style from './style.module.css'

const Header = () => {
    return (
        <header className={style.mainHeader}>
            <Nav />
        </header>
    )
}

export default Header