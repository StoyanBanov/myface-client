import { useDispatch } from "react-redux"
import { CDN_ADDRESS } from "../../constants"
import { useStatus } from "../helpers/customHooks/useStatus"

import style from './style.module.css'
import { deleteCommentById } from "../../store/post/comments"

const PostCommentCard = ({ post, comment }) => {
    const { data } = useStatus()

    const dispatch = useDispatch()

    const onDelete = () => {
        dispatch(deleteCommentById(comment._id))
    }

    return (
        <li className={style.postCommentContainer}>
            {comment.images.length > 0 &&
                <ul>
                    {comment.images.map(i =>
                        <li key={i}>
                            <img className={style.commentImage} src={`${CDN_ADDRESS}/${i}`} alt={i} />
                        </li>
                    )}
                </ul>
            }

            <p>{comment.text}</p>

            {(data._id == comment.user._id || data._id == post.user._id) &&
                <div>
                    <button onClick={onDelete}>Delete</button>
                </div>
            }
        </li>
    )
}

export default PostCommentCard