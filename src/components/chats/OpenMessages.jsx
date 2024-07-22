import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessages } from "../../store/chat/messages"

import style from './style.module.css'
import { CDN_THUMBNAIL_ADDRESS } from "../../constants"

const OpenMessages = ({ chatId }) => {
    const [hasScrolledUp, setHasScrolledUp] = useState(false)
    const [scrollTop, setScrollTop] = useState(0)

    const dispatch = useDispatch()

    const { messages, loading, skip } = useSelector(state => state.entities.messages[chatId]) || { loading: true, skip: 0 }

    const messagesRef = useRef()

    useEffect(() => {
        if (!loading && !hasScrolledUp) {
            const ul = messagesRef.current

            ul.scrollTop = ul.scrollHeight
        }
    }, [loading, hasScrolledUp, skip])

    const onChatScroll = useCallback(() => {
        const ul = messagesRef.current
        const currentScrollTop = ul.scrollTop

        if (currentScrollTop == 0) {
            dispatch(getMessages(chatId, { skip }))
        }

        if (currentScrollTop < scrollTop)
            setHasScrolledUp(true)

        if (currentScrollTop == ul.scrollHeight - ul.clientHeight) {
            setHasScrolledUp(false)
        }

        setScrollTop(currentScrollTop)
    }, [chatId, dispatch, skip, scrollTop])

    return (
        <ul ref={messagesRef} className={style.messagesUl} onScroll={onChatScroll}>
            {messages?.map(m =>
                <li key={m._id}>

                    {m.images.map(id =>
                        <img className={style.messageImg} key={id} src={`${CDN_THUMBNAIL_ADDRESS}/${id}`} />
                    )}

                    <p>{m.user.fname}: {m.text}</p>
                </li>
            )}
        </ul>
    )
}

export default OpenMessages