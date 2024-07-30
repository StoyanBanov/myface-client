import { useOutletContext } from "react-router-dom"
import UserProfile from "../helpers/components/users/UserProfile"

const ProfileInfo = () => {
    const { user } = useOutletContext()

    return (
        <UserProfile user={user} />
    )
}

export default ProfileInfo