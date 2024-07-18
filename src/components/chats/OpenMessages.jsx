import { useCallback, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessages } from "../../store/messages"

import style from './style.module.css'
import { MAX_MESSAGES_SKIP } from "../../constants"

const OpenMessages = ({ chatId }) => {

    const dispatch = useDispatch()

    const { messages, loading, skip } = useSelector(state => state.entities.messages[chatId]) || { loading: true, skip: 0 }

    const messagesRef = useRef()

    useEffect(() => {
        if (!loading && skip <= MAX_MESSAGES_SKIP) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    }, [loading, skip])

    const onChatScroll = useCallback(() => {
        if (messagesRef.current.scrollTop == 0) {
            dispatch(getMessages(chatId, { skip }))
        }
    }, [chatId, dispatch, skip])

    return (
        <ul ref={messagesRef} className={style.messagesUl} onScroll={onChatScroll}>
            {messages?.map(m =>
                <li key={m._id}>
                    <p>{m.user.fname}: {m.text}</p>
                </li>
            )}
        </ul>
    )
}

export default OpenMessages