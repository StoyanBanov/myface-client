import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { clearUsers, getFriendshipRequests } from "../../store/users"
import UsersList from "../helpers/components/users/UsersList"

const FriendRequests = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFriendshipRequests())

        return () => {
            dispatch(clearUsers())
        }
    }, [dispatch])

    return (
        <UsersList />
    )
}

export default FriendRequests