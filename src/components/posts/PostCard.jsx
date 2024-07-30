import { CDN_ADDRESS } from '../../constants'
import { getTimeFromString } from '../../util/helpers'
import ProfilePic from '../helpers/components/images/ProfilePic'

import style from './style.module.css'

const PostCard = ({ post }) => {

    return (
        <div className={style.postCardContainer}>
            <div className={style.postCardHeader}>
                <ProfilePic user={post.user} className={style.profilePic} />

                <div className={style.postCardHeaderRight}>
                    <h3>{post.user.fname} {post.user.lname}</h3>
                    <span>{getTimeFromString(post?.createdAt)}</span>
                </div>
            </div>

            <p>{post.text}</p>

            {post.images &&
                <ul className={style.postImgUl}>
                    {post.images.slice(0, 3).map(i => <li key={i}>
                        <img className={style.postImg} src={`${CDN_ADDRESS}/${i}`} alt={i} />

                        {post.images.length > 3 &&
                            <button>+</button>
                        }
                    </li>)}
                </ul>
            }

        </div>
    )
}

export default PostCard