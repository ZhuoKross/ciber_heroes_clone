import { useEffect } from "react";
import main from "../service/main";
import controllerCanvasGame from "../service/controllerCanvasGame";
import {store, canvasGame} from "../service/store";



export default function Game() {
  useEffect(() => {

    const canvasElement = store.get(canvasGame);
    const body = document.getElementsByTagName("body");
    
    main(canvasElement);
    
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