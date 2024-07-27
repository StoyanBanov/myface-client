import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"

import OpenMessages from "./OpenMessages"

import { removeChat } from "../../store/chat/chats"
import { addMessage, getMessages, removeMessages } from "../../store/chat/messages"

import style from './style.module.css'
import { ALLOWED_FILE_TYPES } from "../../constants"
import FormInput from "../helpers/components/form/FormInput"

const OpenChatCard = ({ chat, loading }) => {
    const initialValues = {
        text: '',
        images: []
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

    const onFileChange = ({ target: { name, files } }) => {
        setValues(state => ({ ...state, [name]: [...state[name], ...files] }))
    }

    const onMessageSubmit = e => {
        e.preventDefault()

        if (values.text || (values.images.length && values.images.every(i => ALLOWED_FILE_TYPES.includes(i))))
            dispatch(addMessage({ ...values, chat: chat._id }))

        setValues({ ...initialValues })
        e.target.reset()
    }

    const onCloseChat = () => {
        dispatch(removeChat(chat._id))
        dispatch(removeMessages(chat._id))
    }

    return (
        <>
            <div className={style.openChatHeader}>
                <h3>{chat.title}</h3>

                <span onClick={onCloseChat}>
                    <svg height={20} width={20} stroke="black">
                        <line x1={2} y1={2} x2={18} y2={18} />
                        <line x1={18} y1={2} x2={2} y2={18} />
                    </svg>
                </span>
            </div>

            <OpenMessages chatId={chat._id} />

            <form onSubmit={onMessageSubmit}>
                <input name="text" placeholder="text..." value={values.text} onChange={onValueChange} />
                <FormInput type={'file'} name={'images'} multiple={true} onChange={onFileChange} />
            </form>
        </>
    )
}

export default OpenChatCard