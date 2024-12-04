import kaplay from "kaplay";


export default function context(){

 return kaplay({
    global: false,
    debug: true,
    //letterbox: true,
    debugKey: "c",
    backgroundAudio: true,
    clearColor: [0,0,0],
});
}


