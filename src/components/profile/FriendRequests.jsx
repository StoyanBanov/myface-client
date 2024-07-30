import { getFriendshipRequests } from "../../store/users"
import UsersList from "../helpers/components/users/UsersList"

const FriendRequests = () => {
    return (
        <UsersList getUsersActionCreator={getFriendshipRequests} />
    )
}

export default FriendRequests