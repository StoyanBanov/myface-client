import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../../store/post/posts"

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    const posts = useSelector(state => state.entities.posts.list)

    return (
        <ul>

        </ul>
    )
}

export default Home