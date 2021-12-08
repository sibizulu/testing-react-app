import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Details from './Details'

const App = props => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nft/:id" element={<Details />} />
    </Routes>
  )
}

export default App
