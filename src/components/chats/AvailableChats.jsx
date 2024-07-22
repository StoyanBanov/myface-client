import { useDispatch, useSelector } from "react-redux"
import { getChats, removeChats } from "../../store/chat/chats"
import { useCallback, useEffect, useRef, useState } from "react"
import AvailableChatCard from "./AvailableChatCard"

const AvailableChats = () => {
    const [isChatsRendered, setIsChatsRendered] = useState(false)

    const dispatch = useDispatch()

    const chatsContainer = useRef()

    const closeChats = useCallback(() => {
        dispatch(removeChats())
        setIsChatsRendered(false)
    }, [dispatch])

    const onCloseChats = useCallback((e) => {
        if (!e.composedPath().includes(chatsContainer.current)) closeChats()
    }, [closeChats])

    useEffect(() => {
        if (isChatsRendered) {
            window.document.addEventListener('click', onCloseChats)
        }

        return () => {
            window.document.removeEventListener('click', onCloseChats)
        }
    }, [onCloseChats, isChatsRendered])

    const chats = useSelector(state => state.entities.chats.available.list)

    const onRenderChatsClick = () => {
        if (!isChatsRendered) {
            dispatch(getChats())
            setIsChatsRendered(true)
        } else {
            closeChats()
        }
    }

    return (
        <div ref={chatsContainer}>
            <button onClick={onRenderChatsClick}>Chats</button>
            {isChatsRendered &&
                <ul>
                    {chats.map(c =>
                        <li key={c._id}>
                            <AvailableChatCard chat={c} closeChats={closeChats} />
                        </li>
                    )}
                </ul>
            }
        </div >
    )
}

export default AvailableChats