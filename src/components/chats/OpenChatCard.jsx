import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"

import OpenMessages from "./OpenMessages"

import { removeChat } from "../../store/chat/chats"
import { addMessage, getMessages, removeMessages } from "../../store/chat/messages"

import FormInput from "../helpers/components/form/FormInput"
import { getFilesError, hasErrors, hasImagesError } from "../../util/validation"
import CloseSvg from "../helpers/components/svgs/CloseSvg"

import style from './style.module.css'

const OpenChatCard = ({ chat, loading }) => {
    const initialValues = {
        text: '',
        images: []
    }

    const [values, setValues] = useState({ ...initialValues })

    const [errors, setErrors] = useState({ images: getFilesError() })

    const dispatch = useDispatch()

    useEffect(() => {
        if (chat._id)
            dispatch(getMessages(chat._id))
    }, [dispatch, chat._id])

    const onValueChange = ({ target: { name, value } }) => {
        setValues(state => ({ ...state, [name]: value }))
    }

    const onFileChange = ({ target: { name, files } }) => {
        setValues(state => ({ ...state, [name]: [...files] }))

        setErrors(state => ({ ...state, name: hasImagesError(files) }))
    }

    const onMessageSubmit = e => {
        e.preventDefault()

        if (!hasErrors(errors) && (values.text || values.images.length)) {
            dispatch(addMessage({ ...values, chat: chat._id }))

            setValues({ ...initialValues })
            e.target.reset()
        }
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
                    <CloseSvg />
                </span>
            </div>

            <OpenMessages chatId={chat._id} />

            <form onSubmit={onMessageSubmit}>
                <input name="text" placeholder="text..." value={values.text} onChange={onValueChange} maxLength={500} />
                <FormInput type={'file'} name={'images'} multiple={true} onValueChange={onFileChange} />
            </form>
        </>
    )
}

export default OpenChatCard