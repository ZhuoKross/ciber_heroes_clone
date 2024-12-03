import { useEffect } from "react";
import main from "../service/main";

export default function Game (){
    useEffect( () => {
       
        
       
        main();
    
        
    }, [])
    
      return (
        <></>
      )
}