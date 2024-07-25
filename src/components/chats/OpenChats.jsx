import { useSelector } from "react-redux"
import OpenChatCard from "./OpenChatCard"

import style from './style.module.css'

const OpenChats = () => {
    const chats = useSelector(state => state.entities.chats.open)

    return (
        <ul className={style.openChatsUl}>
            {chats.map((c) =>
                !c.loading &&
                <li className={style.openChatLi} key={c.chat._id}>
                    <OpenChatCard chat={c.chat} messages={c.messages} />
                </li>
            )}
        </ul>
    )
}

export default OpenChats