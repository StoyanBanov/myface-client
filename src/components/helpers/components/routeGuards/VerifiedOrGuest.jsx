import { Navigate, Outlet } from "react-router-dom"
import { useStatus } from "../../customHooks/useStatus"

const VerifiedOrGuest = () => {
    const { isAuth, data } = useStatus()

    return !isAuth || (isAuth && !data.notVerified) ? <Outlet /> : <Navigate to={'/verify'} replace />
}

export default VerifiedOrGuest