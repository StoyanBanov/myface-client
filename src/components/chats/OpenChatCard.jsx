import { useDispatch } from "react-redux"
import { removeChat } from "../../store/chats"
import { useEffect, useState } from "react"

import OpenMessages from "./OpenMessages"
import { addMessage, getMessages, removeMessages } from "../../store/messages"

const OpenChatCard = ({ chat, loading }) => {
    const initialValues = {
        text: ''
    }

    const [values, setValues] = useState({ ...initialValues })

    const dispatch = useDispatch()

    useEffect(() => {
        if (chat._id)
            dispatch(getMessages(chat._id))
    }, [dispatch, chat._id])

    const onValueChange = ({ target: { name, value } }) => {
        setValues(state => ({ ...state, [name]: value }))
    }

    const onMessageSubmit = e => {
        e.preventDefault()

        dispatch(addMessage({ ...values, chat: chat._id }))

        setValues({ ...initialValues })
        e.target.reset()
    }

    const onCloseChat = () => {
        dispatch(removeChat(chat._id))
        dispatch(removeMessages(chat._id))
    }

    return (
        <div>
            <span onClick={onCloseChat}>
                <svg height={20} width={20} stroke="black">
                    <line x1={2} y1={2} x2={18} y2={18} />
                    <line x1={18} y1={2} x2={2} y2={18} />
                </svg>
            </span>

            <h3>{chat.title}</h3>

            <OpenMessages chatId={chat._id} />

            <form onSubmit={onMessageSubmit}>
                <input name="text" placeholder="text..." value={values.text} onChange={onValueChange} />
            </form>
        </div>
    )
}

export default OpenChatCard