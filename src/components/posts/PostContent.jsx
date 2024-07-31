import { CDN_ADDRESS } from "../../constants"

import style from './style.module.css'

const PostContent = ({ post }) => {
    return (
        <>
            <p>{post.text}</p>

            {post.images.length > 0 &&
                <ul className={style.postImgUl}>
                    {post.images.slice(0, 3).map(i => <li key={i}>
                        <img className={post.images.length > 1 ? style.postImg : style.postSingleImg} src={`${CDN_ADDRESS}/${i}`} alt={i} />

                        {post.images.length > 3 &&
                            <button>+</button>
                        }
                    </li>)}
                </ul>
            }
        </>
    )
}

export default PostContent