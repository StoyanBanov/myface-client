import { useSelector } from "react-redux"

export const useStatus = () => {
    const { data } = useSelector(state => state.auth)

    return { isAuth: !!data.token, data: { ...data } }
}