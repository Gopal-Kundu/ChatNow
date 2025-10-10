import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

const App = () => {
  return (
    <div className='bg-[url("./src/assets/bgImg.jpg")] h-screen bg-cover bg-center'>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </div>
  )
}

export default App