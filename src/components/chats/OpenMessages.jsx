import { useCallback, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessages } from "../../store/messages"

import style from './style.module.css'

const OpenMessages = ({ chatId, skip, upSkip }) => {

    const dispatch = useDispatch()

    const { messages, loading } = useSelector(state => state.entities.messages[chatId]) || { loading: true }

    const messagesRef = useRef()

    useEffect(() => {
        if (!loading && skip == 10) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    }, [loading, skip])

    const onChatScroll = useCallback(() => {
        if (messagesRef.current.scrollTop == 0) {
            dispatch(getMessages(chatId, { skip }))
            upSkip(state => state + 10)
        }
    }, [chatId, dispatch, skip, upSkip])

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