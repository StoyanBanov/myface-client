import PostContent from './PostContent'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'

import style from './style.module.css'

const PostCard = ({ post }) => {

    return (
        <div className={style.postCardContainer}>
            <PostHeader post={post} />

            <PostContent post={post} />

            <PostFooter post={post} />
        </div>
    )
}

export default PostCard