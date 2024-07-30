import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

import style from './style.module.css'
import { useEffect } from "react"
import { clearPosts } from "../../store/post/posts"

const PostDetails = () => {
    const [searchParams] = useSearchParams()

    const dispatch = useDispatch()

    const { single, loading } = useSelector(state => state.entities.posts)

    useEffect(() => {
        return () => {
            dispatch(clearPosts())
        }
    })

    return (
        <div>
            <p>{single.text}</p>
        </div>
    )
}

export default PostDetails