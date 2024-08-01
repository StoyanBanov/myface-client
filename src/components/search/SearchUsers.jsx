import { useOutletContext } from "react-router-dom"
import { getUsers } from "../../store/users"
import UsersList from "../users/UsersList"

const SearchUsers = () => {
    const { search } = useOutletContext()

    return (
        <UsersList getUsersActionCreator={() => getUsers(search)} />
    )
}

export default SearchUsers