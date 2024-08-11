import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessages } from "../../store/chat/messages"

import { useCarousel } from "../helpers/customHooks/useCarousel"
import Carousel from "../helpers/components/images/Carousel"
import CreateMessage from "./CreateMessage"
import MessageCard from "./MessageCard"

import style from './style.module.css'

const OpenMessages = ({ chatId }) => {
    const [hasScrolledUp, setHasScrolledUp] = useState(false)
    const [scrollTop, setScrollTop] = useState(0)

    const dispatch = useDispatch()

    const { messages, loading, skip } = useSelector(state => state.entities.messages[chatId]) || { loading: true, skip: 0 }

    const messagesRef = useRef()

    useEffect(() => {
        if (!loading && !hasScrolledUp) {
            setTimeout(() => {
                const ul = messagesRef.current

                ul.scrollTop = ul.scrollHeight
            }, 100)
        }
    }, [loading, hasScrolledUp, messages])

    const { openCarousel, closeCarousel, isCarouselOpened } = useCarousel()
    const [carouselValues, setCarouselValues] = useState({ imgs: [], ind: 0 })

    const openImagesInCarousel = (imgs, ind) => () => {
        setCarouselValues({ imgs, ind })
        openCarousel()
    }

    const onChatScroll = useCallback(() => {
        const ul = messagesRef.current
        const currentScrollTop = ul.scrollTop

        if (currentScrollTop == 0) {
            dispatch(getMessages(chatId, { skip }))

            ul.scrollTop = currentScrollTop + 1
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
                    <li>
                        <span>Loading...</span>
                    </li>
                }

                {messages?.map(m => <MessageCard key={m._id} message={m} openImagesInCarousel={openImagesInCarousel} />)}
            </ul>

            {isCarouselOpened &&
                <div>
                    <Carousel imgIds={carouselValues.imgs} ind={carouselValues.ind} closeHandler={closeCarousel} />
                </div>
            }

            <CreateMessage chatId={chatId} loading={loading} />
        </>
    )
}

export default OpenMessages