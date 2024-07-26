import { Navigate, Outlet } from "react-router-dom"
import { useStatus } from "../../customHooks/useStatus"

const NotVerified = () => {
    const { data } = useStatus()

    return data.notVerified
        ? <Outlet />
        : <Navigate to={'/'} replace />
}

export default NotVerified