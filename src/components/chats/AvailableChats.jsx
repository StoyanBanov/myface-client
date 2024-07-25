import { useDispatch, useSelector } from "react-redux"
import { getChats, clearAvailableChats } from "../../store/chat/chats"
import { useCallback, useEffect, useRef, useState } from "react"
import AvailableChatCard from "./AvailableChatCard"

import style from './style.module.css'

const AvailableChats = () => {
    const [isChatsRendered, setIsChatsRendered] = useState(false)

    const dispatch = useDispatch()

    const chatsContainer = useRef()
    const chatsToggleAnchor = useRef()

    const closeChats = useCallback(() => {
        dispatch(clearAvailableChats())
        setIsChatsRendered(false)
    }, [dispatch])

    const onCloseChats = useCallback((e) => {
        if (!e.composedPath().includes(chatsContainer.current) && e.target != chatsToggleAnchor.current) closeChats()
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

    const onRenderChatsClick = e => {
        e.preventDefault()

        if (!isChatsRendered) {
            dispatch(getChats())
            setIsChatsRendered(true)
        } else {
            closeChats()
        }
    }

    return (
        <>
            <a ref={chatsToggleAnchor} href="#" onClick={onRenderChatsClick}>Chats</a>

            <div ref={chatsContainer} className={style.availableChatsContainer}>
                {isChatsRendered &&
                    <ul>
                        {chats.map(c =>
                            <li key={c._id}>
                                <AvailableChatCard chat={c} closeChats={closeChats} />
                            </li>
                        )}
                    </ul>
                }
            </div>
        </>
    )
}

export default AvailableChats