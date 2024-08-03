import { useDispatch } from "react-redux"
import { openChat } from "../../store/chat/chats"

const AvailableChatCard = ({ chat, closeChats }) => {
    const dispatch = useDispatch()

    const onOpenChatClick = () => {
        dispatch(openChat(chat._id, window.innerWidth))

        closeChats()
    }

    return (
        <div onClick={onOpenChatClick}>
            <h3>{chat.title}</h3>
        </div>
    )
}

export default AvailableChatCard