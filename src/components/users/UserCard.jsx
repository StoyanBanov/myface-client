import { useDispatch } from "react-redux";
import { acceptFriendship, removeFriendship, requestFriendship } from "../../store/users";
import { useStatus } from "../helpers/customHooks/useStatus"
import ProfilePic from "../helpers/components/images/ProfilePic";
import { FRIENDSHIP_STATUS_ACCEPT, FRIENDSHIP_STATUS_ADD_FRIEND, FRIENDSHIP_STATUS_FRIENDS, FRIENDSHIP_STATUS_REQUESTED, FRIENDSHIP_STATUS_YOU } from "../../constants";

import style from './style.module.css'
import UserFullName from "./UserFullName";

const UserCard = ({ user }) => {
    const { data } = useStatus()

    const dispatch = useDispatch()

    let friendshipStatus

    if (user._id == data._id) friendshipStatus = FRIENDSHIP_STATUS_YOU
    else if (user.friends) friendshipStatus = FRIENDSHIP_STATUS_FRIENDS
    else if (user.incomingRequest) friendshipStatus = FRIENDSHIP_STATUS_ACCEPT
    else if (user.outgoingRequest) friendshipStatus = FRIENDSHIP_STATUS_REQUESTED
    else friendshipStatus = FRIENDSHIP_STATUS_ADD_FRIEND

    const onClick = () => {
        switch (friendshipStatus) {
            case FRIENDSHIP_STATUS_ADD_FRIEND:
                dispatch(requestFriendship({ id: user._id }))
                break;
            case FRIENDSHIP_STATUS_ACCEPT:
                dispatch(acceptFriendship({ id: user._id }))
                break;
            case FRIENDSHIP_STATUS_REQUESTED:
            case FRIENDSHIP_STATUS_FRIENDS:
                dispatch(removeFriendship({ id: user._id }))
                break;
        }
    }

    return (
        <div className={style.userCardContainer}>
            <ProfilePic user={user} className={style.profilePic} />

            <UserFullName user={user} />

            {friendshipStatus == FRIENDSHIP_STATUS_YOU
                ? <span> {friendshipStatus} </span>
                : <button onClick={onClick}>{friendshipStatus}</button>
            }
        </div>
    )
}

export default UserCard