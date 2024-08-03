import { CDN_AVATAR_ADDRESS, CDN_DEFAULT_AVATAR_NAME_FEMALE, CDN_DEFAULT_AVATAR_NAME_MALE } from "../../../../constants"
import { useNavigateToUser } from "../../customHooks/useNavigateToUser"

const ProfilePic = ({ user, className = '', onClick }) => {
    const defaultOnClick = useNavigateToUser(user._id)

    return (
        <img
            className={className}

            src={`${CDN_AVATAR_ADDRESS}/${user.profilePic
                || (user.gender == 'male'
                    ? CDN_DEFAULT_AVATAR_NAME_MALE
                    : CDN_DEFAULT_AVATAR_NAME_FEMALE
                )}`} alt={user.fname}

            onClick={onClick || defaultOnClick}
        />
    )
}

export default ProfilePic