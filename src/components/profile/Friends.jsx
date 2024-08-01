import { getFriends } from "../../store/users"
import UsersList from "../users/UsersList"

const Friends = () => {
    return (
        <UsersList getUsersActionCreator={getFriends} />
    )
}

export default Friends