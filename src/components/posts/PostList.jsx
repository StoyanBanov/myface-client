import { useDispatch, useSelector } from "react-redux"
import PostCard from "./PostCard"
import { useEffect } from "react"
import { clearPosts } from "../../store/post/posts"
import { useScroll } from "../helpers/customHooks/useScroll"

import style from './style.module.css'
import NoMoreContent from "../helpers/components/loading/NoMoreContent"

const PostList = ({ getPostsActionCreator }) => {
    const dispatch = useDispatch()

    const { list, loading, hasReceivedAll } = useSelector(state => state.entities.posts)

    useEffect(() => {
        dispatch(getPostsActionCreator())

        return () => {
            dispatch(clearPosts())
        }
    }, [dispatch, getPostsActionCreator])

    useScroll(loading, hasReceivedAll, getPostsActionCreator)

    return (
        <ul className={style.postCardUl}>
            {list.map(p => <li key={p._id}><PostCard post={p} /></li>)}

            {loading &&
                new Array(5).fill(0).map((_, i) =>
                    <li key={i} className={style.postCardContainer} style={{ height: '40vh' }}>
                    </li>
                )
            }

            {hasReceivedAll &&
                <NoMoreContent contentType={'posts'} />
            }
        </ul>
    )
}

export default PostList