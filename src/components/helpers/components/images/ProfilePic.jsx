import { CDN_AVATAR_ADDRESS, CDN_DEFAULT_AVATAR_NAME_FEMALE, CDN_DEFAULT_AVATAR_NAME_MALE } from "../../../../constants"

const ProfilePic = ({ user, className = '' }) => {
    return (
        <img className={className} src={`${CDN_AVATAR_ADDRESS}/${user.profilePic
            || (user.gender == 'male'
                ? CDN_DEFAULT_AVATAR_NAME_MALE
                : CDN_DEFAULT_AVATAR_NAME_FEMALE
            )}`} alt={user.fname} />
    )
}

export default ProfilePic