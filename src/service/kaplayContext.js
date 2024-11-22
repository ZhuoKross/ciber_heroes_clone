import kaplay from "kaplay";


export default function context(canvas) {


    console.log("canvas from context function: ", canvas);
    console.log("dimensiones del canvas: ", canvas.clientWidth, canvas.clientHeight)

    

    

        return kaplay({
            global: false,
            debug: true,
            //letterbox: true,
            debugKey: "c",
            width: canvas.clientWidth,
            height: canvas.clientHeight,
            canvas: canvas,
        });


}
