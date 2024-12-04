import { canvasGame, store } from "./store";

export default async function controllerCanvas(body, landingPage) {

    const bodyElement = body[0];
    const childCanvas = bodyElement.children[2];

    console.log("body element: ", bodyElement);
    console.log("body childrens: ", body[0].children);

    if (landingPage) {
        console.log("landing page element: ", landingPage);

        if (childCanvas) {
            console.log("child canvas: ", bodyElement.children[2])

            bodyElement.removeChild(childCanvas);

            store.set(canvasGame, childCanvas);
            //contollerCanvasGame(childCanvas);
        }
    }




}