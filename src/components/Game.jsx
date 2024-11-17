import { useEffect, useRef } from "react";
import initGame from "../service/initGame";
import Dialogue from "./Dialogue";


export default function Game() {

    const canvasRef = useRef(null);
    const hasInitialized = useRef(false);

    useEffect(() => {
        // console.log("canvas in game component", document.getElementById("game"));

        // console.log("elemento contenedor: ", document.querySelector("#father_game"));

        // console.log("canvas ref: ", canvasRef.current);
        console.log("Element container dialogue: ", document.querySelector(".dialogue-container"))
        console.log("Element description dialogue: ", document.getElementById("description"))

        if (canvasRef.current && !hasInitialized.current) {
            console.log("entra en la validación")
            initGame(canvasRef.current)

            hasInitialized.current = true;
        }
    }, [canvasRef])





    return (

        <div className="w-full h-screen relative">

            <p className="text-zinc-400 text-2xl" id="note">Press W/A/S/D to move :)</p>
            
             <Dialogue /> 



            <div id="father_game" className="w-full h-screen">

                <canvas className="w-full h-full" id="game" ref={canvasRef}></canvas>
            </div>
        </div>

    );
}