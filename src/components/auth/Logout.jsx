import { Navigate } from "react-router-dom"
import { clearAuthData } from "../../util/session"
import { useDispatch } from "react-redux"
import { logout } from "../../store/auth"
import { useEffect } from "react"

const Logout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        clearAuthData()

        dispatch(logout())
    }, [dispatch])

    return <Navigate to={'/'} replace />
}

export default Logout