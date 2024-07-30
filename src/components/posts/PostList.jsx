import { useDispatch, useSelector } from "react-redux"
import PostCard from "./PostCard"
import { useEffect } from "react"
import { clearPosts } from "../../store/post/posts"

const PostList = ({ getPostsActionCreator }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPostsActionCreator())

        return () => {
            dispatch(clearPosts())
        }
    }, [dispatch, getPostsActionCreator])

    const posts = useSelector(state => state.entities.posts.list)

    return (
        <ul>
            {posts.map(p => <li key={p._id}><PostCard post={p} /></li>)}
        </ul>
    )
}

export default PostList