import { useSelector } from "react-redux"
import PostCard from "./PostCard"

const PostList = () => {
    const posts = useSelector(state => state.entities.posts.list)

    return (
        <>
            {posts.map(p => <PostCard key={p._id} post={p} />)}
        </>
    )
}

export default PostList