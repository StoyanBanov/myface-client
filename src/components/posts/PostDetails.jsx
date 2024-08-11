import { useNavigate } from "react-router-dom"
import { clearPosts, deletePostById, getPostsById } from "../../store/post/posts"
import PostContent from "./PostContent"
import PostFooter from "./PostFooter"
import { useStatus } from "../helpers/customHooks/useStatus"

import PostHeader from "./PostHeader"
import { useSingleItemFromStore } from "../helpers/customHooks/useSingleItemFromStore"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import style from './style.module.css'
import PostComments from "./PostComments"
import Loading from "../helpers/components/preload/Loading"
import { useScroll } from "../helpers/customHooks/useScroll"
import { getComments } from "../../store/post/comments"

const PostDetails = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { lastDeletedId, loading } = useSelector(state => state.entities.posts)

    const post = useSingleItemFromStore(getPostsById, clearPosts, 'posts')

    const { loading: loadingComments, hasReceivedAll } = useSelector(state => state.entities.comments)

    useScroll(loadingComments, hasReceivedAll, () => getComments(post._id))

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
        <>
            <Loading loading={loading} />

            <div className={style.postCardContainer} style={post ? { marginBottom: 20 } : { height: '50vh' }}>
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

                        {post &&
                            <PostComments post={post} />
                        }
                    </>
                }
            </div>
        </>
    )
}

export default PostDetails