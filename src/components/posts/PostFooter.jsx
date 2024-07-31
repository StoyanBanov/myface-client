import { useLocation, useNavigate } from "react-router-dom"
import { useStatus } from "../helpers/customHooks/useStatus"

import style from './style.module.css'

const PostFooter = ({ post }) => {
    const { data } = useStatus()

    const location = useLocation()
    const navigate = useNavigate()

    const onDetailsClick = () => {
        navigate('/posts/' + post._id)
    }

    return (
        <div className={style.postCardFooter}>
            {data._id != post.user._id &&
                <button>Like</button>
            }

            {location.pathname != '/posts/' + post._id &&
                <button onClick={onDetailsClick}>Details</button>
            }
        </div>
    )
}

export default PostFooter