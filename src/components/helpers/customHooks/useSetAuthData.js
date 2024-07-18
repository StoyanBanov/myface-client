import { useEffect } from "react"
import { useStatus } from "./useStatus"
import { setAuthData } from "../../../util/session"

export const useSetAuthData = () => {
    const { isAuth, data } = useStatus()

    useEffect(() => {
        if (isAuth) {
            setAuthData(data)
        }
    }, [isAuth, data])
}