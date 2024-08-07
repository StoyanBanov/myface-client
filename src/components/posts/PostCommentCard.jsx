import { useDispatch } from "react-redux"
import { CDN_ADDRESS } from "../../constants"
import { useStatus } from "../helpers/customHooks/useStatus"

import style from './style.module.css'
import { deleteCommentById } from "../../store/post/comments"
import Carousel from "../helpers/components/images/Carousel"
import { useCarousel } from "../helpers/customHooks/useCarousel"
import { useState } from "react"
import ProfilePic from "../helpers/components/images/ProfilePic"
import UserFullName from "../users/UserFullName"
import { getDateAndTime } from "../../util/helpers"
import Loading from "../helpers/components/preload/Loading"

const PostCommentCard = ({ post, comment }) => {
    const [isBeingDeleted, setIsBeingDeleted] = useState(false)

    const [carouselInd, setCarouselInd] = useState(0)

    const { openCarousel, closeCarousel, isCarouselOpened } = useCarousel()

    const { data } = useStatus()

    const dispatch = useDispatch()

    const openImageInCarousel = (ind) => () => {
        setCarouselInd(ind)

        openCarousel()
    }

    const onDelete = () => {
        dispatch(deleteCommentById(comment._id))

        setIsBeingDeleted(true)
    }

    return (
        <li className={style.postCommentContainer} style={{ position: 'relative' }}>
            <Loading loading={isBeingDeleted} />

            <div className={style.postCommentHeader}>
                <ProfilePic user={comment.user} className={style.commentProfilePic} />

                <div className={style.postCardHeaderRight}>
                    <UserFullName user={comment.user} />
                    <span>{getDateAndTime(comment.createdAt)}</span>
                </div>
            </div>

            {comment.images.length > 0 &&
                <ul>
                    {comment.images.slice(0, 3).map((i, ind) =>
                        <li key={i}>
                            <img onClick={openImageInCarousel(ind)} className={style.commentImage} src={`${CDN_ADDRESS}/${i}`} alt={i} />
                        </li>
                    )}

                    {comment.images.length > 3 &&
                        <button onClick={openCarousel} style={{ fontSize: 30 }} className={style.commentImage}>+</button>
                    }
                </ul>
            }

            {isCarouselOpened &&
                <Carousel imgIds={comment.images} ind={carouselInd} closeHandler={closeCarousel} />
            }

            <p>{comment.text}</p>

            {(data._id == comment.user._id || data._id == post.user._id) &&
                <div>
                    <button onClick={onDelete}>Delete</button>
                </div>
            }
        </li>
    )
}

export default PostCommentCard