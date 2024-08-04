import { useEffect, useState } from 'react'
import CloseSvg from '../svgs/CloseSvg'
import style from './style.module.css'
import { CDN_ADDRESS } from '../../../../constants'
import SideArrowSvg from '../svgs/SideArrowSvg'

const Carousel = ({ imgIds, closeHandler }) => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    })

    const onClose = () => {
        closeHandler()
    }

    const onLeftClick = () => {
        setIndex(state => state > 0 ? state - 1 : imgIds.length - 1)
    }

    const onRightClick = () => {
        setIndex(state => state < imgIds.length - 1 ? state + 1 : 0)
    }

    return (
        <div className={style.carouselContainer}>
            <button onClick={onLeftClick}><SideArrowSvg width={40} height={90} side='left' strokeWidth={3} /></button>

            <span className={style.closeBtn} onClick={onClose}><CloseSvg /></span>

            <img src={`${CDN_ADDRESS}/${imgIds[index]}`} />

            <button onClick={onRightClick}><SideArrowSvg width={40} height={90} side='right' strokeWidth={3} /></button>
        </div>
    )
}

export default Carousel