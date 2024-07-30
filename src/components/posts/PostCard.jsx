import ProfilePic from '../helpers/components/images/ProfilePic'
import style from './style.module.css'

const PostCard = ({ post }) => {
    return (
        <div className={style.postCardContainer}>
            <div className={style.postCardHeader}>
                <ProfilePic user={post.user} className={style.profilePic} />

                <h3>{post.user.fname} {post.user.lname}</h3>
            </div>

            <p>{post.text}</p>


        </div>
    )
}

export default PostCard