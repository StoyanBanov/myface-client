import { useDispatch } from "react-redux"
import { getChats, clearAvailableChats } from "../../store/chat/chats"
import { useCallback, useEffect, useRef, useState } from "react"

import commonStyle from '../helpers/commonStyle.style.module.css'
import style from './style.module.css'
import AvailableChatsList from "./AvailableChatsList"

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
            <a
                className={isChatsRendered ? commonStyle.activeLink : commonStyle.inactiveLink
                } ref={chatsToggleAnchor}
                href="#"
                onClick={onRenderChatsClick}
            >
                Chats
            </a>

            <div ref={chatsContainer} className={style.availableChatsContainer}>
                {isChatsRendered &&
                    <AvailableChatsList closeChats={closeChats} />
                }
            </div>

        </>
    )
}

export default AvailableChats