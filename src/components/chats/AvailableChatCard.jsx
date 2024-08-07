import { useDispatch } from "react-redux"
import { openChat } from "../../store/chat/chats"

import style from './style.module.css'

const AvailableChatCard = ({ chat, closeChats }) => {
    const dispatch = useDispatch()

    const onOpenChatClick = () => {
        dispatch(openChat(chat._id, window.innerWidth))

        closeChats()
    }

    return (
        <div className={style.availableChatCardContainer} onClick={onOpenChatClick}>
            <h3>{chat.title}</h3>
        </div>
    )
}

export default AvailableChatCard