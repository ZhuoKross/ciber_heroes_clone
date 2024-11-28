import dialogFigth from "../dialogFigth";

export default async function fightTwoLevelTwo(k, goBackScene) {

    const canvasWidth = k.width();
    const canvasHeight = k.height();

    function introDialogue() {

        player.isOnDialogue = true;
        console.log("the player is in dialogue? ", player.isOnDialogue);
        const resp = "Opción 1";
        dialogFigth(
            k,
            "¿Que es phising?",
            ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
            k.vec2(800, 400),
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
        k.sprite("02_back_palm_orange_sunset"),
        k.pos(0),
        k.scale(6.65 ,5.5),
    ])

    k.add([
        k.sprite("03_back_palm_orange_sunset"),
        k.pos(0),
        k.scale(6.65, 5.5),
    ])

    k.add([
        k.sprite("04_back_palm_orange_sunset"),
        k.pos(0),
        k.scale(5, 4.6),
        k.area({
            shape: new k.Rect(k.vec2(0, 130 ), canvasWidth, 10)
        })
    ])


    // const monster = k.add([
    //     k.sprite("monster02_level02"),
    //     k.pos(200, 130),
    //     k.area({
    //         shape: new k.Rect(k.vec2(0), 20, 20)
    //     }),
    //     k.body(),
    //     k.anchor("center"),
    //     k.scale(4),
    //     {anim: "idle"}
    // ])


    // monster.play("idle"); 

    k.add([
        k.rect(canvasWidth, 200),
        k.pos(0, canvasHeight - 50),
        k.area(),
        k.body({isStatic: true}),
        k.color(k.Color.fromHex(("#2e4053")))
    ])
   // Add the player to the scene
   k.add(player)
   player.play("idle");
    introDialogue();
}