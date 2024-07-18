import { useSelector } from "react-redux"
import OpenChatCard from "./OpenChatCard"

const OpenChats = () => {
    const chats = useSelector(state => state.entities.chats.open)

    return (
        <ul>
            {chats.map((c) =>
                !c.loading &&
                <li key={c.chat._id}>
                    <OpenChatCard chat={c.chat} messages={c.messages} />
                </li>
            )}
        </ul>
    )
}

export default OpenChats