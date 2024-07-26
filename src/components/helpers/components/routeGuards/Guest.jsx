import { Navigate, Outlet } from "react-router-dom"
import { useStatus } from "../../customHooks/useStatus"

const Guest = () => {
    const { isAuth } = useStatus()

    return isAuth
        ? <Navigate to={'/'} replace />
        : <Outlet />
}

export default Guest