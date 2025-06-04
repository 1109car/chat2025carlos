

import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Global } from './routes/Global'
import { All } from './auth/All'
  


function App() {

 
  return (
    <Routes>
    <Route path="/" element={<All />} />
    <Route path="/pagina" element={<Global />} />
  </Routes>
  )
}

export default App
