import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessages } from "../../store/chat/messages"
import { CDN_ADDRESS } from "../../constants"
import { useStatus } from "../helpers/customHooks/useStatus"
import ProfilePic from "../helpers/components/images/ProfilePic"
import { getDateAndTime } from "../../util/helpers"

import style from './style.module.css'
import { useCarousel } from "../helpers/customHooks/useCarousel"
import Carousel from "../helpers/components/images/Carousel"

const OpenMessages = ({ chatId }) => {
    const [hasScrolledUp, setHasScrolledUp] = useState(false)
    const [scrollTop, setScrollTop] = useState(0)

    const dispatch = useDispatch()

    const { messages, loading, skip } = useSelector(state => state.entities.messages[chatId]) || { loading: true, skip: 0 }

    const { data } = useStatus()

    const messagesRef = useRef()

    useEffect(() => {
        if (!loading && !hasScrolledUp) {
            setTimeout(() => {
                const ul = messagesRef.current

                ul.scrollTop = ul.scrollHeight
            }, 100)
        }
    }, [loading, hasScrolledUp])

    const { openCarousel, closeCarousel, isCarouselOpened } = useCarousel()
    const [carouselImgs, setCarouselImgs] = useState([])

    const openImagesInCarousel = (imgs) => () => {
        setCarouselImgs(imgs)
        openCarousel()
    }

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
        <>
            <ul ref={messagesRef} className={style.messagesUl} onScroll={onChatScroll}>
                {loading &&
                    <span>Loading...</span>
                }

                {messages?.map(m =>
                    <li className={m.user._id == data._id ? style.messageLiUser : style.messageLi} key={m._id}>
                        {m.user._id != data._id &&
                            <ProfilePic user={m.user} className={style.messageAvatar} />
                        }

                        <div>
                            <span>{getDateAndTime(m.createdAt)}</span>
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
                                        onClick={openImagesInCarousel(m.images)}
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

            {isCarouselOpened &&
                <div>
                    <Carousel imgIds={carouselImgs} closeHandler={closeCarousel} />
                </div>
            }
        </>
    )
}

export default OpenMessages