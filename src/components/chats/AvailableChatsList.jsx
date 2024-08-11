import { useSelector } from "react-redux"
import { useScroll } from "../helpers/customHooks/useScroll"
import AvailableChatCard from "./AvailableChatCard"
import { getChats } from "../../store/chat/chats"
import { useRef } from "react"

const AvailableChatsList = ({ closeChats }) => {
    const { list, loading } = useSelector(state => state.entities.chats.available)

    const chatsUl = useRef()

    useScroll(loading, false, getChats, chatsUl.current)

    return (
        <ul ref={chatsUl}>
            {list.map(c =>
                <li key={c._id}>
                    <AvailableChatCard chat={c} closeChats={closeChats} />
                </li>
            )}

            {loading &&
                <li>
                    <span>Loading...</span>
                </li>
            }

            {list.length == 0 && <li>No chats</li>}
        </ul>
    )
}

export default AvailableChatsList