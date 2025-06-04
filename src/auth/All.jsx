import { useState } from 'react'
import { Logeo } from './Logeo'
import { Register } from './Register'

export const All = () => {
  const [showLogin, setShowLogin] = useState(true)

  const handleShowLogin = () => setShowLogin(true)
  const handleShowRegister = () => setShowLogin(false)

  return (
    <main className="h-screen flex items-center justify-center">
      {showLogin ? (
        <Logeo registerFunt={handleShowRegister} />
      ) : (
        <Register loginFunt={handleShowLogin} />
      )}
    </main>
  )
}
