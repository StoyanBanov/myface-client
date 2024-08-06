import { useRef, useState } from 'react'
import PostContent from './PostContent'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'
import PostComments from './PostComments'

import style from './style.module.css'

const PostCard = ({ post }) => {
    const [showComments, setShowComments] = useState(false)

    const postRef = useRef()

    const openComments = () => {
        setShowComments(true)
        document.body.style.overflow = 'hidden'
    }

    const closeComments = () => {
        setShowComments(false)
        document.body.style.overflow = 'auto'
    }

    return (
        <>
            {showComments &&
                <div onClick={closeComments} className={style.postCardBackground}></div>
            }

            <div ref={postRef} style={showComments ? { position: 'fixed', top: '0', maxHeight: '95vh', zIndex: 1, overflowY: 'scroll', overflowX: 'hidden', scrollMargin: '10px' } : {}} className={style.postCardWrapper}>
                <div className={style.postCardContainer}>
                    <PostHeader post={post} />

                    <PostContent post={post} />

                    <PostFooter post={post} openComments={openComments} />

                    {showComments &&
                        <PostComments post={post} />
                    }
                </div>
            </div>
        </>
    )
}

export default PostCard