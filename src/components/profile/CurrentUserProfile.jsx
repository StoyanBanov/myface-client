import Profile from "./Profile"
import { useSelector } from "react-redux"

const CurrentUserProfile = () => {
    const user = useSelector(state => state.entities.users.current)

    return (
        <Profile user={user} />
    )
}

export default CurrentUserProfile