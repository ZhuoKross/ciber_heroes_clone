import React, { useEffect } from 'react'
import Game from './game'
import initGame from '../service/initGame'



export default function Root() {


  return (
    <div className='w-full h-screen'>
      

      <Game />
    </div>
  )
}
