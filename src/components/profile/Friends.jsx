import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { clearUsers, getFriends } from "../../store/users"
import UsersList from "../helpers/components/users/UsersList"

const Friends = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFriends())

        return () => {
            dispatch(clearUsers())
        }
    }, [dispatch])

    return (
        <UsersList />
    )
}

export default Friends