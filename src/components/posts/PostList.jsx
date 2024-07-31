import { useDispatch, useSelector } from "react-redux"
import PostCard from "./PostCard"
import { useEffect } from "react"
import { clearPosts } from "../../store/post/posts"
import { useScroll } from "../helpers/customHooks/useScroll"

const PostList = ({ getPostsActionCreator }) => {
    const dispatch = useDispatch()

    const { list, loading } = useSelector(state => state.entities.posts)

    useEffect(() => {
        dispatch(getPostsActionCreator())

        return () => {
            dispatch(clearPosts())
        }
    }, [dispatch, getPostsActionCreator])

    useScroll(loading, getPostsActionCreator)

    return (
        <ul>
            {list.map(p => <li key={p._id}><PostCard post={p} /></li>)}
        </ul>
    )
}

export default PostList