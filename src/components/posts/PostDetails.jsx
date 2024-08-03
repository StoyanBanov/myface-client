import { useNavigate } from "react-router-dom"
import { clearPosts, deletePostById, getPostsById } from "../../store/post/posts"
import PostContent from "./PostContent"
import PostFooter from "./PostFooter"
import { useStatus } from "../helpers/customHooks/useStatus"

import style from './style.module.css'
import PostHeader from "./PostHeader"
import { useSingleItemFromStore } from "../helpers/customHooks/useSingleItemFromStore"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

const PostDetails = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { lastDeletedId } = useSelector(state => state.entities.posts)

    const post = useSingleItemFromStore(getPostsById, clearPosts, 'posts')

    useEffect(() => {
        if (lastDeletedId == post?._id)
            navigate('/profile')
    }, [navigate, lastDeletedId, post])

    const { data } = useStatus()

    const onEditClick = () => {
        navigate('/edit/post/' + post._id)
    }

    const onDeleteClick = () => {
        if (!confirm('Do you really want to delete this post?')) return

        dispatch(deletePostById(post._id))
    }

    return (
        <div className={style.postCardContainer}>
            {post &&
                <>
                    {data._id != post?.user?._id || data._id == post.user &&
                        <PostHeader post={post} />
                    }

                    <div>
                        <PostContent post={post} />

                        <p>Visibility: {post.visibility}</p>

                        {data._id == post.user?._id || data._id == post.user
                            ? <div className={style.postCardFooter}>
                                <span>Likes: {post.likesCount}</span>

                                <div>
                                    <button onClick={onEditClick}>Edit</button>

                                    <button onClick={onDeleteClick}>Delete</button>
                                </div>
                            </div>
                            : <PostFooter post={post} />
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default PostDetails