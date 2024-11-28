import dialogFigth from "../dialog";
export default async function figthOne(k) {

    function introDialogue() {

        player.isOnDialogue = true;
        console.log("the player is in dialogue? ", player.isOnDialogue);

        dialogFigth(
            k,
            "¿Cuál es la respuesta correcta?",
            ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
            k.vec2(200, 200),
            (selectedOption) => {
                console.log("Opción seleccionada:", selectedOption);
                // Lógica para manejar la respuesta seleccionada
            },
            () => {
                console.log("Diálogo cerrado");
                // Lógica adicional si el diálogo se cierra sin enviar
            }
        );
        
    }

    const background = k.add ([
        k.sprite("background_level_02"),
        k.scale(1, 0.9),
        k.pos(-150, 0)
    ])
   
    const canvasWidth = k.width();
    const canvasHeight = k.height();

    k.add([
        k.rect(canvasWidth, 200),
        k.pos(0, canvasHeight - 50),
        k.area(),
        k.body({isStatic: true}),
        k.color(k.Color.fromHex(("#2e4053")))
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
        k.scale(6),
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
    const enemies_one = k.add([
        k.sprite("enemies_one"),
        k.pos(300, 650),
        k.area({
            shape: new k.Rect(k.vec2(0), 30, 30)
        }),
        k.body(),
        {anim: "idle"},
        k.anchor("center"),
        k.scale(6)
    ])

    const gravity = 200;

    k.setGravity(gravity);


    enemies_one.play("idle");

    k.add(player);
    

   // Add the player to the scene
   enemies_one.play("idle");
   player.play("idle");
   introDialogue();
    
}
