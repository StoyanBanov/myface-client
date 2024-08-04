import { NavLink, useNavigate, useSearchParams } from "react-router-dom"
import { useStatus } from "../helpers/customHooks/useStatus"
import { useEffect, useState } from "react"
import AvailableChats from "../chats/AvailableChats"

import { useWindowWidth } from "../helpers/customHooks/useWindowWidth"
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"

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

    const { windowWidth } = useWindowWidth()

    const onSearchChange = e => {
        setSearch(e.target.value)
    }

    const onSearchSubmit = e => {
        e.preventDefault()

        navigate('/search/users?search=' + search)
    }

    return (
        <>
            {windowWidth > 900
                ? <DesktopNav isAuth={isAuth} search={search} onSearchSubmit={onSearchSubmit} onSearchChange={onSearchChange} />

                : <MobileNav isAuth={isAuth} search={search} onSearchSubmit={onSearchSubmit} onSearchChange={onSearchChange} />
            }
        </>
    )
}

export default Nav