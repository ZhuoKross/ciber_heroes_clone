import kaplay from "kaplay";


let kaplayContext = null;

export default function context(canvas) {


    console.log("canvas from context function: ", canvas)

    //if (!kaplayContext) {
        return kaplay({
            global: false,
            debug: true,
            letterbox: true,
            debugKey: "c",
            width: canvas.clientWidth,
            height: canvas.offsetHeight,
            canvas: canvas,
            //pixelDensity: devicePixelRatio,
        });

    //}

    //return kaplayContext;
}
