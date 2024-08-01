import { useNavigate } from "react-router-dom"

export const useNavigateToUser = (id) => {
    const navigate = useNavigate()

    return () => {
        navigate('/users/' + id)
    }
}