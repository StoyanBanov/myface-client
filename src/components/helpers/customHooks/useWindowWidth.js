import { useEffect, useState } from "react"

export const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const onResize = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', onResize)

        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return { windowWidth }
}