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

import './App.css'
import { appendMessage } from './store/messages';

function App() {
  const dispatch = useDispatch()

  const { data } = useStatus()

  const isAuthLoading = useSelector(state => state.auth.loading)

  useEffect(() => {
    dispatch(initialize(getAuthData()))
  }, [dispatch])

  useEffect(() => {
    if (data._id && !isAuthLoading) {
      dispatch(initializeCurrent(data._id))

      socket.connect()

      socket.emit('online', data._id)
    }

    return () => {
      socket.emit('offline')
      socket.off('message')
      socket.disconnect()
    }
  }, [dispatch, data, isAuthLoading])

  useEffect(() => {
    if (data._id && !isAuthLoading) {
      socket.on('message', (message) => {
        dispatch(appendMessage(message))
      });
    } else {
      socket.off('message')
    }

    return () => {
      socket.off('message')
    }
  }, [dispatch, data, isAuthLoading,])

  return (
    <>
      {!isAuthLoading &&
        <>
          <Header />

          <Routes>
            <Route path='/' />
            <Route path='/search' element={<Search />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='*' element={<NotFound />} />
          </Routes>

          <OpenChats />
        </>
      }
    </>
  )
}

export default App