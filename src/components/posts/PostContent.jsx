import PostImages from './PostImages'
import style from './style.module.css'

const PostContent = ({ post }) => {
    return (
        <>
            <p>{post.text}</p>

            {post.images.length > 0 &&
                <PostImages post={post} />
            }
        </>
    )
}

export default PostContent