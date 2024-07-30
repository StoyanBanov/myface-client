import { getPosts } from "../../store/post/posts"
import PostList from "../posts/PostList"

const Home = () => {

    return (
        <PostList getPostsActionCreator={getPosts} />
    )
}

export default Home