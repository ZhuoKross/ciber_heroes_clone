export default function scene02(k, goToNextScene, levelData) {

    try {

        k.add([
            k.sprite("level-02"),
            k.scale(2),
            k.pos(100, 50)
        ])


        // k.add([
        //     k.text("Presiona 'U' para ir a la escena 03"),
        //     k.pos(400, 130),
        //     k.anchor("center")
        // ])

    } catch (e) {
        throw new Error("No se pudo cargar totalmente la escena 02");
    }


    k.onKeyPress("u", () => {
        goToNextScene();
    });


}