import { useDispatch } from "react-redux";
import { addFriend, removeFriend } from "../../../../store/users";
import { useStatus } from "../../customHooks/useStatus"

const UserCard = ({ user }) => {
    const { data } = useStatus()

    const dispatch = useDispatch()

    const onAddFriendClick = () => {
        dispatch(addFriend({ id: user._id }))
    }

    const onRemoveFriendClick = () => {
        dispatch(removeFriend({ id: user._id }))
    }

    return (
        <div>
            <img alt={user.fname} />

            <h3>{user.fname} {user.lname}</h3>

            {user._id != data._id
                ? user.friends.includes(data._id)
                    ? <button onClick={onRemoveFriendClick}>Friends</button>
                    : <button onClick={onAddFriendClick}>Add Friend</button>
                : <p>You</p>
            }
        </div >
    )
}

export default UserCard