import dialogFigth from "../dialogFigth";
export default async function figthOne(k, backScene) {
    
    const canvasWidth = k.width();
    const canvasHeight = k.height();

    
    function introDialogue() {

        player.isOnDialogue = true;
        console.log("the player is in dialogue? ", player.isOnDialogue);
        const resp = "a. Cada 3 a 6 meses";
        dialogFigth(
            k,
            "¿Qué tan frecuentemente se recomienda cambiar tus contraseñas?",
            ["a. Cada 3 a 6 meses", "b.	Cada año", "c. Solo cuando alguien la descubre", "d. Nunca, si es fuerte"],
            k.vec2(canvasWidth / 2, canvasHeight / 2),
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
        k.sprite("background_level_02"),
        k.scale(1, 0.9),
        k.pos(-150, 0)
    ])
   

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
    const enemies_one = k.add([
        k.sprite("enemies_one"),
        k.pos(300, canvasHeight - 50),
        k.area({
            shape: new k.Rect(k.vec2(0), 30, 40)    
        }),
        k.body(),
        {anim: "idle"},
        k.anchor("center"),
        k.scale(8)
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
