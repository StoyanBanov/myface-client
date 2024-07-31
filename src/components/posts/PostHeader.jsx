import { getTimeFromString } from "../../util/helpers"
import ProfilePic from "../helpers/components/images/ProfilePic"

import style from './style.module.css'

const PostHeader = ({ post }) => {
    return (
        <div className={style.postCardHeader}>
            <ProfilePic user={post.user} className={style.profilePic} />

            <div className={style.postCardHeaderRight}>
                <h3>{post.user.fname} {post.user.lname}</h3>
                <span>{getTimeFromString(post?.createdAt)}</span>
            </div>
        </div>
    )
}

export default PostHeader