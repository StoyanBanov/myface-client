import { getFriendshipRequests } from "../../store/users"
import UsersList from "../users/UsersList"

const FriendRequests = () => {
    return (
        <UsersList getUsersActionCreator={getFriendshipRequests} />
    )
}

export default FriendRequests