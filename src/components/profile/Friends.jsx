import { getFriends } from "../../store/users"
import UsersList from "../helpers/components/users/UsersList"

const Friends = () => {
    return (
        <UsersList getUsersActionCreator={getFriends} />
    )
}

export default Friends