import { useEffect } from "react";
import main from "../service/main";
import {store, canvasGame} from "../service/store";



export default function Game() {
  useEffect(() => {

    
    const body = document.getElementsByTagName("body");
    
    main();
    
    //const listOfCanvas = document.getElementsByTagName("canvas");
    
    // if (canvasElement) {
    //   console.log("canvas from game Component: ", canvasElement);

    //   //controllerCanvasGame(body, canvasElement);
    // }

  }, [])

  return (
    <></>
  )
}