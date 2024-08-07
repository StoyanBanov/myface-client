import { useDispatch } from "react-redux"
import { useEffect } from "react"

import OpenMessages from "./OpenMessages"

import { removeChat } from "../../store/chat/chats"
import { getMessages, removeMessages } from "../../store/chat/messages"
import CloseSvg from "../helpers/components/svgs/CloseSvg"

import style from './style.module.css'

const OpenChatCard = ({ chat }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (chat._id)
            dispatch(getMessages(chat._id))

        return () => {
            dispatch(removeMessages(chat._id))
        }
    }, [dispatch, chat._id])

    const onCloseChat = () => {
        dispatch(removeChat(chat._id))
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
        </>
    )
}

export default OpenChatCard