import dialogFigth from "../dialogFigth";

export default async function figthTwo(k, backScene) {
   
    function introDialogue() {
    console.log("aqui estoy")
        player.isOnDialogue = true;
        console.log("the player is in dialogue? ", player.isOnDialogue);
        const resp = "Opción 1";
        dialogFigth(
            k,
            "¿Pregunta Dos?",
            ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
            k.vec2(800, 400),
            (selectedOption) => {
                console.log("Opción seleccionada:", selectedOption);
                if(selectedOption === resp){
                    backScene();
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

    const background = k.add ([
        k.sprite("background_figthTwo"),
        k.scale(1.8, 1),
        k.pos(0, -100)
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
    const enemies_02_three = k.add([
        k.sprite("enemies_02_three"),
        k.pos(400, 650),
        k.area({
            shape: new k.Rect(k.vec2(0), 35, 35)
        }),
        k.body(),
        {anim: "idle"},
        k.anchor("center"),
        k.scale(4)
    ])

    const gravity = 200;

    k.setGravity(gravity);    

    k.add(player);
   enemies_02_three.play("idle");
   player.play("idle");
   introDialogue();
    
    
}