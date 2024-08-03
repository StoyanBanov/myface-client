import { CDN_ADDRESS } from "../../constants"

import style from './style.module.css'

const PostImages = ({ post, slice = 3, styleObj = {} }) => {
    return (
        <ul className={style.postImgUl}>
            {post.images.slice(0, slice).map(i => <li key={i}>
                <img style={styleObj} className={post.images.length > 1 ? style.postImg : style.postSingleImg} src={`${CDN_ADDRESS}/${i}`} alt={i} />
            </li>)}

            {post.images.length > slice &&
                <li>
                    <button style={{ fontSize: 50 }} className={post.images.length > 1 ? style.postImg : style.postSingleImg}>+</button>
                </li>
            }
        </ul>
    )
}

export default PostImages