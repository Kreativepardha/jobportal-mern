import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginForm } from './components/auth/login-components/loginform'

function App() {

  return (
    <>
        <Routes>
          <Route path="/login" element={<LoginForm />}  />
          {/* <Route path="/signup"  /> */}
        </Routes>
    </>
  )
}

export default App
