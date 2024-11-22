import context from "./kaplayContext";
import { displayDialogue } from "../utils/utils";
import { AnswerDisplayDialogue } from "../utils/answer";
import scene01 from "./scenes/scene_01";
import scene02 from "./scenes/scene_02";


export default async function main(canvas) {

    console.log("verificación de función main(canvas): ", canvas);


    const k = context(canvas)

    k.setBackground(k.Color.fromHex("424050"))
    
    function changeScene(nextScene){
        k.go(nextScene)
    }
    

    scene01(k, () => {changeScene("scene02")});
    scene02(k, () => {changeScene("scene01")});

    k.go("scene01");
}