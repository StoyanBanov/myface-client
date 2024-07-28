import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessages } from "../../store/chat/messages"

import style from './style.module.css'
import { CDN_ADDRESS } from "../../constants"
import { useStatus } from "../helpers/customHooks/useStatus"
import ProfilePic from "../helpers/components/images/ProfilePic"

const OpenMessages = ({ chatId }) => {
    const [hasScrolledUp, setHasScrolledUp] = useState(false)
    const [scrollTop, setScrollTop] = useState(0)

    const dispatch = useDispatch()

    const { messages, loading, skip } = useSelector(state => state.entities.messages[chatId]) || { loading: true, skip: 0 }

    const { data } = useStatus()

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
                <li className={m.user._id == data._id ? style.messageLiUser : style.messageLi} key={m._id}>
                    {m.user._id != data._id &&
                        <ProfilePic user={m.user} className={style.messageAvatar} />
                    }

                    <div>
                        <div className={style.messageImgsContainer}>
                            {m.images.map(id =>
                                <img
                                    key={id}
                                    style={{
                                        maxWidth: m.images.length == 1 ? 180 : 90,
                                        maxHeight: m.images.length == 1 ? 180 : 90
                                    }}
                                    className={style.messageImg}
                                    src={`${CDN_ADDRESS}/${id}`}
                                />
                            )}
                        </div>

                        <p>
                            {m.text}
                        </p>
                    </div>
                </li>
            )}
        </ul>
    )
}

export default OpenMessages