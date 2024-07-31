import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { clearPosts, getPostsById } from "../../store/post/posts"
import PostContent from "./PostContent"
import PostFooter from "./PostFooter"
import { useStatus } from "../helpers/customHooks/useStatus"

import style from './style.module.css'
import PostHeader from "./PostHeader"

const PostDetails = () => {
    const [post, setPost] = useState(null)

    const { id } = useParams()

    const dispatch = useDispatch()

    const { list, loading } = useSelector(state => state.entities.posts)

    useEffect(() => {
        if (list.length)
            setPost(list.find(p => p._id == id))
    }, [list, id])

    useEffect(() => {
        dispatch(getPostsById(id))

        return () => {
            dispatch(clearPosts())
        }
    }, [dispatch, id])

    const { data } = useStatus()

    return (
        <div className={style.postCardContainer}>
            {post &&
                <>
                    {data._id != post?.user._id &&
                        <PostHeader post={post} />
                    }

                    <div>
                        <PostContent post={post} />

                        <p>Visibility: {post.visibility}</p>

                        {data._id == post?.user._id
                            ? <div className={style.postCardFooter}>
                                <button>Edit</button>

                                <button>Delete</button>
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