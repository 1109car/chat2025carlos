

import './App.css'
import { Logeo } from './auth/Logeo'
import { Route, Routes } from 'react-router-dom'
import { Global } from './routes/Global'
  


function App() {

 
  return (
    <Routes>
    <Route path="/" element={<Logeo />} />
    <Route path="/pagina" element={<Global />} />
  </Routes>
  )
}

export default App
