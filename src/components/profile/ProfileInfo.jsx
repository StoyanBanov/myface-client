import { useOutletContext } from "react-router-dom"

const ProfileInfo = () => {
    const { user } = useOutletContext()

    return (
        <div>
            <p>full name: {user.fname} {user.lname}</p>

            <p>gender: {user.gender || 'unknown'}</p>

            <p>date of birth: {user.dob || 'unknown'}</p>

            <p>email: {user.email}</p>
        </div>
    )
}

export default ProfileInfo