import { Outlet } from "react-router-dom"

import ProfilePic from "../helpers/components/images/ProfilePic"

import InnerNav from "../helpers/components/innerNav/InnerNav"

const Profile = ({ user }) => {
    return (
        <>
            <ProfilePic user={user} />

            <InnerNav links={[
                { to: '/profile/friends', text: 'Friends' },
                { to: '/profile/requests', text: 'Requests' },
                { to: '/profile/posts', text: 'Posts' },
                { to: '/profile/edit', text: 'Edit' },
                { to: '/profile/settings', text: 'Settings' }
            ]} />

            <Outlet context={{ user }} />
        </>
    )
}

export default Profile