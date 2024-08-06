import { useLocation, useNavigate } from "react-router-dom"
import { useStatus } from "../helpers/customHooks/useStatus"

import style from './style.module.css'
import { useDispatch } from "react-redux"
import { addLikeToPost, deleteLikeFromPost } from "../../store/post/posts"

const PostFooter = ({ post, openComments }) => {

    const { data } = useStatus()

    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const onDetailsClick = () => {
        navigate('/posts/' + post._id)
    }

    const onLike = () => {
        dispatch(addLikeToPost({ post: post._id }))
    }

    const onRemoveLike = () => {
        dispatch(deleteLikeFromPost(post._id))
    }

    return (
        <div className={style.postCardFooter}>
            <div>
                {data._id && data._id != post.user?._id
                    ? <>
                        {post.isLiked
                            ? <button onClick={onRemoveLike}>Liked</button>
                            : <button onClick={onLike}>Like</button>
                        }

                        <span className={style.postLikesCount}>{post.likesCount}</span>
                    </>
                    : <span className={style.postLikesCount}>Likes: {post.likesCount}</span>
                }
            </div>


            {location.pathname != '/posts/' + post._id &&
                <>
                    <button onClick={openComments}>Comments</button>

                    <button onClick={onDetailsClick}>Details</button>
                </>
            }
        </div>
    )
}

export default PostFooter