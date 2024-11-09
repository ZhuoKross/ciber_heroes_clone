import './App.css'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
function App() {

  return (
    <>
       <Routes>
		<Route path='/' element={<Root />} />
	     </Routes>
    </>
  )
}

export default App
