import { useState } from "react"

export const useCarousel = () => {
    const [isCarouselOpened, setIsCarouselOpened] = useState(false)

    return {
        isCarouselOpened,
        openCarousel: () => setIsCarouselOpened(true),
        closeCarousel: () => setIsCarouselOpened(false)
    }
}