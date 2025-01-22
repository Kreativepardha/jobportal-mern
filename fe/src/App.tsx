import { Route, Router, Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login"  />
          <Route path="/signup"  />
        </Routes>
      </Router>
    </>
  )
}

export default App
