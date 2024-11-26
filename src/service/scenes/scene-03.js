export default function (k, goToNextScene, levelData) {

    try {
        // k.add([
        //     k.text("Presiona 'O' para volver a la escena 02"),
        //     k.pos(400, 130),
        //     k.anchor("center")
        // ])


        k.add([
            k.sprite("level-03"),
            k.scale(2),
            k.pos(100, 50)
        ])


        
    } catch (error) {
        console.log("Error uploading the 3rd scene");
    }


    k.onKeyPress("o", () => {
        goToNextScene();
    })
}