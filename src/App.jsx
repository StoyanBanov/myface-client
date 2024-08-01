import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useStatus } from './components/helpers/customHooks/useStatus';

import OpenChats from './components/chats/OpenChats';
import socket from './socket';

import { initialize } from './store/auth';
import { initializeCurrent } from './store/users';
import { getAuthData } from './util/session';

import Header from './components/header/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Verify from './components/auth/Verify';
import Logout from './components/auth/Logout';
import Search from './components/search/Search';
import NotFound from './components/notFound/NotFound';

import { appendMessage } from './store/chat/messages';
import Home from './components/home/Home';
import CreatePost from './components/posts/CreatePost';
import PostDetails from './components/posts/PostDetails';

import './App.css'
import User from './components/helpers/components/routeGuards/User';
import Guest from './components/helpers/components/routeGuards/Guest';
import NotVerified from './components/helpers/components/routeGuards/NotVerified';
import Friends from './components/profile/Friends';
import CurrentUserProfile from './components/profile/CurrentUserProfile';
import Edit from './components/profile/Edit';
import Settings from './components/profile/Settings';
import VerifiedOrGuest from './components/helpers/components/routeGuards/VerifiedOrGuest';
import SearchUsers from './components/search/SearchUsers';
import SearchPosts from './components/search/SearchPosts';
import Posts from './components/profile/Posts';
import FriendRequests from './components/profile/FriendRequests';
import ProfileInfo from './components/profile/ProfileInfo';
import UserProfile from './components/profile/UserProfile';
import EditPost from './components/posts/EditPost';

function App() {
    const dispatch = useDispatch()

    const { data } = useStatus()

    const isAuthLoading = useSelector(state => state.auth.loading)

    useEffect(() => {
        dispatch(initialize(getAuthData()))
    }, [dispatch])

    useEffect(() => {
        if (data._id && !isAuthLoading && data.notVerified !== true) {
            dispatch(initializeCurrent(data._id))

            socket.on('message', (message) => {
                dispatch(appendMessage(message))
            });

            socket.emit('online', data._id)
        }

        return () => {
            socket.emit('offline', data._id)
            socket.off('message')
        }
    }, [dispatch, data, isAuthLoading])

    return (
        <>
            {!isAuthLoading &&
                <>
                    <Header />

                    <section>
                        <Routes>
                            <Route element={<VerifiedOrGuest />}>
                                <Route element={<User />}>
                                    <Route path='/' element={<Home />} />

                                    <Route path='/profile' element={<CurrentUserProfile />}>
                                        <Route index={true} element={<ProfileInfo />} />
                                        <Route path='overview' element={<ProfileInfo />} />
                                        <Route path='friends' element={<Friends />} />
                                        <Route path='requests' element={<FriendRequests />} />
                                        <Route path='posts' element={<Posts />} />
                                        <Route path='edit' element={<Edit />} />
                                        <Route path='settings' element={<Settings />} />
                                    </Route>

                                    <Route path='/users/:id' element={<UserProfile />}>
                                        <Route index={true} element={<ProfileInfo />} />
                                    </Route>

                                    <Route path='/search' element={<Search />} >
                                        <Route path='users' element={<SearchUsers />} />
                                        <Route path='posts' element={<SearchPosts />} />
                                    </Route>

                                    <Route path='/create'>
                                        <Route index={true} element={<CreatePost />} />
                                        <Route path="post" element={<CreatePost />} />
                                    </Route>

                                    <Route path='/edit'>
                                        <Route path="post/:id" element={<EditPost />} />
                                    </Route>

                                    <Route path='/logout' element={<Logout />} />
                                </Route>

                                <Route element={<Guest />}>
                                    <Route path='/register' element={<Register />} />
                                    <Route path='/login' element={<Login />} />
                                </Route>
                            </Route>

                            <Route element={<NotVerified />}>
                                <Route path='/verify' element={<Verify />} />
                            </Route>

                            <Route path='posts/:id' element={<PostDetails />} />

                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </section>

                    <OpenChats />
                </>
            }
        </>
    )
}

export default App