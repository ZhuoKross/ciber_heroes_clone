import { useEffect, useRef } from "react";
import main from "../service/main";



export default function Game() {

    const canvasRef = useRef(null);
    const hasInitialized = useRef(false);

    useEffect(() => {
       
        
       
            main()

            
        
    }, [])





    return (

        <div className="w-full h-screen relative">

            
            
             



            <div id="father_game" className="w-full h-full">

                <canvas className="w-full h-full" id="game" ref={canvasRef}>
                <p className="text-zinc-400 text-2xl" id="note">Press W/A/S/D to move :)</p>
                </canvas>
            </div>
        </div>

    );
}