import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { clearPosts, getPosts } from "../../store/post/posts"

import style from './style.module.css'
import PostCard from "../helpers/components/postCard/PostCard"

const SearchPosts = () => {
    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()

    useEffect(() => {
        dispatch(getPosts(searchParams.get('search')))

        return () => {
            dispatch(clearPosts())
        }
    }, [dispatch, searchParams])

    const posts = useSelector(state => state.entities.posts.list)

    return (
        <ul className={style.postsUl}>
            {posts.map(u => <li key={u._id}><PostCard user={u} /></li>)}
        </ul>
    )
}

export default SearchPosts