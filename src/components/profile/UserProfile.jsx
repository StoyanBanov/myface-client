import Profile from "./Profile"
import { getUserById, clearUsers } from "../../store/users"
import { useSingleItemFromStore } from "../helpers/customHooks/useSingleItemFromStore"

const UserProfile = () => {
    const user = useSingleItemFromStore(getUserById, clearUsers, 'users')

    return (
        <Profile user={user} />
    )
}

export default UserProfile