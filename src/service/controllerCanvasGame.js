export default async function contollerCanvasGame(body, canvas){

    const bodyElement = body[0];
    
    console.log("body: ", bodyElement);

    if(canvas){
        console.log("canvas from the controller function: ", canvas);

        //bodyElement.appendChild(canvas);
    }
}