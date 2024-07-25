import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { clearUsers, getUsers } from "../../store/users"
import UserCard from "../helpers/components/userCard/UserCard"

const Search = () => {
    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()

    useEffect(() => {
        dispatch(getUsers(searchParams.get('search')))

        return () => {
            dispatch(clearUsers())
        }
    }, [dispatch, searchParams])

    const users = useSelector(state => state.entities.users.list)

    return (
        <>
            <ul>
                {users.map(u => <UserCard key={u._id} user={u} />)}
            </ul>
        </>
    )
}

export default Search