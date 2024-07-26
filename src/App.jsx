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

function App() {
    const dispatch = useDispatch()

    const { data } = useStatus()

    const isAuthLoading = useSelector(state => state.auth.loading)

    useEffect(() => {
        dispatch(initialize(getAuthData()))
    }, [dispatch])

    useEffect(() => {
        if (data._id && !isAuthLoading && data.verified !== false) {
            dispatch(initializeCurrent(data._id))

            socket.on('message', (message) => {
                dispatch(appendMessage(message))
            });

            socket.emit('online', data._id)
        }

        return () => {
            socket.emit('offline')
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
                            <Route element={<User />}>
                                <Route path='/' element={<Home />} />

                                <Route path='/search' element={<Search />} />

                                <Route path='/create'>
                                    <Route index={true} element={<CreatePost />} />
                                    <Route path="post" element={<CreatePost />} />
                                </Route>

                                <Route path='/logout' element={<Logout />} />
                            </Route>

                            <Route element={<Guest />}>
                                <Route path='/register' element={<Register />} />
                                <Route path='/login' element={<Login />} />
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