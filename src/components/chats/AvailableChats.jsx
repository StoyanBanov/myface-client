import { useDispatch, useSelector } from "react-redux"
import { getChats, clearAvailableChats } from "../../store/chat/chats"
import { useCallback, useEffect, useRef, useState } from "react"
import AvailableChatCard from "./AvailableChatCard"

import style from './style.module.css'
import commonStyle from '../helpers/commonStyle.style.module.css'
import { useScroll } from "../helpers/customHooks/useScroll"

const AvailableChats = () => {
    const [isChatsRendered, setIsChatsRendered] = useState(false)

    const dispatch = useDispatch()

    const chatsContainer = useRef()
    const chatsToggleAnchor = useRef()
    const chatsUl = useRef()

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

    const { list, loading } = useSelector(state => state.entities.chats.available)

    useScroll(loading, getChats, chatsUl.current)

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
                    </ul>
                }
            </div>
        </>
    )
}

export default AvailableChats