import { useEffect } from 'react';
import main from '../service/main';


export default function Root() {

  useEffect( () => {
       
        
       
    main();

    
}, [])

  return (
    <></>
  )
}
