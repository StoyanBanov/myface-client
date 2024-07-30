import { getOwnPosts } from "../../store/post/posts"
import PostList from "../posts/PostList"

const Posts = () => {
    return (
        <PostList getPostsActionCreator={getOwnPosts} />
    )
}

export default Posts