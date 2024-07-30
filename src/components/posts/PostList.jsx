import { useDispatch, useSelector } from "react-redux"
import PostCard from "./PostCard"
import { useEffect, useRef } from "react"
import { clearPosts } from "../../store/post/posts"

const PostList = ({ getPostsActionCreator }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPostsActionCreator())

        return () => {
            dispatch(clearPosts())
        }
    }, [dispatch, getPostsActionCreator])

    const { list, loading } = useSelector(state => state.entities.posts)

    const postsUlRef = useRef()

    const onScroll = () => {
        const ul = postsUlRef.current

        if (!loading && ul.scrollTop == ul.scrollHeight - ul.clientHeight) {
            dispatch(getPostsActionCreator())
        }
    }

    return (
        <ul ref={postsUlRef} onScroll={onScroll}>
            {list.map(p => <li key={p._id}><PostCard post={p} /></li>)}
        </ul>
    )
}

export default PostList