import { Navigate, Outlet } from "react-router-dom"
import { useStatus } from "../../customHooks/useStatus"

const User = () => {
    const { isAuth } = useStatus()

    return isAuth
        ? <Outlet />
        : <Navigate to={'/login'} replace />
}

export default User