import { Navigate } from "react-router-dom"
import { clearAuthData } from "../../util/session"
import { useDispatch } from "react-redux"
import { logout } from "../../store/auth"
import { useEffect } from "react"
import { clearOpenChats } from "../../store/chat/chats"

const Logout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        clearAuthData()

        dispatch(logout())
        dispatch(clearOpenChats())
    }, [dispatch])

    return <Navigate to={'/'} replace />
}

export default Logout