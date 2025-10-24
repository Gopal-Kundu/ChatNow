import React from 'react'
import { useSelector } from 'react-redux'
import Signup from './Signup';
import ChatPage from './chatPage';
function HomePage() {
    const user = useSelector((state) => state.auth.user);
  return (
    <div>
        {!user ? <Signup/> : <ChatPage/>}
    </div>
  )
}

export default HomePage