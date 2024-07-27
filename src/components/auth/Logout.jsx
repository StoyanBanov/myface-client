import { Navigate } from "react-router-dom"
import { clearAuthData } from "../../util/session"
import { useDispatch } from "react-redux"
import { logout } from "../../store/auth"
import { useEffect } from "react"
import { clearOpenChats } from "../../store/chat/chats"
import { useStatus } from "../helpers/customHooks/useStatus"

const Logout = () => {
    const dispatch = useDispatch()

    const { data } = useStatus()

    useEffect(() => {
        if (data._id) {
            clearAuthData()

            dispatch(logout())
            dispatch(clearOpenChats())
        }
    }, [dispatch, data._id])

    return <Navigate to={'/login'} replace />
}

export default Logout