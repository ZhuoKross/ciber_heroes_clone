import dialogFigth from "../dialogFigth";

export default async function fightTwoLevelTwo(k, goBackScene) {

    const canvasWidth = k.width();
    const canvasHeight = k.height();

    function introDialogue() {

        player.isOnDialogue = true;
        console.log("the player is in dialogue? ", player.isOnDialogue);
        const resp = "c. No hacer clic y verificar primero el remitente";
        dialogFigth(
            k,
            "¿Qué debes hacer si recibes un correo sospechoso con un enlace?",
            ["a. Responder al correo para obtener más información ", "b. Hacer clic para ver de qué se trata", "c. No hacer clic y verificar primero el remitente", "d. Reenviar el correo a tus contactos"],
            k.vec2(canvasWidth / 2, canvasHeight / 2),
            (selectedOption) => {
                console.log("Opción seleccionada:", selectedOption);
                if(selectedOption === resp){
                    k.setGravity(null)
                    goBackScene();
                }else{
                    alert("lastima sapa")
                }
            },
            () => {
                console.log("Diálogo cerrado");
                // Lógica adicional si el diálogo se cierra sin enviar
            }
        );
        
    }
    k.add([
        k.sprite("background_figth_02_Three"),
        k.pos(0),
        k.scale(3.2, 2.9),
    ])

    const player = k.make([
        k.sprite("character"),
        { anim: "idle" },
        k.area({
            shape: new k.Rect(new k.vec2(0), 26, 26)
        }),
        k.body(),
        k.anchor("center"),
        k.pos(1300, 650),
        k.scale(8),
        {
            speed: 200,
            direction: "left",
            isOnDialogue: false,
            enemiesDefeated: 0,
            currentPosition: {},
            currentLevel: "",
        },
        "player"
    ])

    k.add([
        k.rect(canvasWidth, 200),
        k.pos(0, canvasHeight - 50),
        k.area(),
        k.body({isStatic: true}),
        k.color(k.Color.fromHex(("#2e4053")))
    ])

    const enemies_02_three = k.add([
        k.sprite("enemies_02_three"),
        k.pos(400, 650),
        k.area({
            shape: new k.Rect(k.vec2(0), 30, 30)
        }),
        k.body(),
        {anim: "idle"},
        k.anchor("center"),
        k.scale(7)
    ])
   // Add the player to the scene
   k.add(player)
   player.play("idle");
   enemies_02_three.play("idle")
    introDialogue();
}