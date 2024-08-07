import { useState } from "react"
import { CDN_ADDRESS } from "../../constants"
import Carousel from "../helpers/components/images/Carousel"
import { useCarousel } from "../helpers/customHooks/useCarousel"

import style from './style.module.css'

const PostImages = ({ post, slice = 3, styleObj = {} }) => {
    const [carouselInd, setCarouselInd] = useState(0)

    const { openCarousel, closeCarousel, isCarouselOpened } = useCarousel()

    const openImageInCarousel = (ind) => () => {
        setCarouselInd(ind)

        openCarousel()
    }

    return (
        <>
            <ul className={style.postImgUl}>
                {post.images.slice(0, slice).map((i, ind) => <li key={i}>
                    <img onClick={openImageInCarousel(ind)} style={styleObj} className={post.images.length > 1 ? style.postImg : style.postSingleImg} src={`${CDN_ADDRESS}/${i}`} alt={i} />
                </li>)}

                {post.images.length > slice &&
                    <li>
                        <button onClick={openCarousel} style={{ fontSize: 50 }} className={style.postImg}>+</button>
                    </li>
                }
            </ul>

            {isCarouselOpened &&
                <Carousel imgIds={post.images} ind={carouselInd} closeHandler={closeCarousel} />
            }
        </>
    )
}

export default PostImages