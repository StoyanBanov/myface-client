import { useOutletContext } from "react-router-dom"
import { getPosts } from "../../store/post/posts"

import style from './style.module.css'
import PostList from "../posts/PostList"

const SearchPosts = () => {
    const { search } = useOutletContext()

    return (
        <PostList getPostsActionCreator={() => getPosts(search)} />
    )
}

export default SearchPosts