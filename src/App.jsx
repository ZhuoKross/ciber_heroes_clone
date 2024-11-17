import './App.css'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Root from './components/root'
//import Game from './components/game'


function App() {

  return (
    <>
       <Routes>
		      <Route path='/' element={<Root />} > 
            
          </ Route>
	     </Routes>
    </>
  )
}

export default App
