import { useRef, useState } from 'react'
import PostContent from './PostContent'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'
import PostComments from './PostComments'

import style from './style.module.css'
import CloseBtn from '../helpers/components/buttons/CloseBtn'

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

            <div ref={postRef} className={showComments ? style.postCardWrapperScroll : style.postCardWrapper}>
                {showComments &&
                    <div style={{ position: 'fixed', top: '20px', right: '20px' }}>
                        <CloseBtn onClick={closeComments} />
                    </div>
                }

                <div className={style.postCardContainer}>
                    <PostHeader post={post} />

                    <PostContent post={post} />

                    <PostFooter post={post} openComments={openComments} closeComments={closeComments} showComments={showComments} />

                    {showComments &&
                        <PostComments post={post} scrollable={postRef.current} />
                    }
                </div>
            </div>
        </>
    )
}

export default PostCard