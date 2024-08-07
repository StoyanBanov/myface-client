import { useRef, useState } from 'react'
import PostContent from './PostContent'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'
import PostComments from './PostComments'

import style from './style.module.css'
import CloseBtn from '../helpers/components/buttons/CloseBtn'
import { useScroll } from '../helpers/customHooks/useScroll'
import { getComments } from '../../store/post/comments'
import { useSelector } from 'react-redux'

const PostCard = ({ post }) => {
    const [showComments, setShowComments] = useState(false)

    const postRef = useRef()

    const { loading, hasReceivedAll } = useSelector(state => state.entities.comments)

    useScroll(loading, hasReceivedAll, () => getComments(post._id), postRef.current)

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
                        <PostComments post={post} />
                    }
                </div>
            </div>
        </>
    )
}

export default PostCard