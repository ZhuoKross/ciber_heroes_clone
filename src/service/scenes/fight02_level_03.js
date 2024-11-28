import dialogFigth from "../dialogFigth";
export default async function fightTwoLevelThree(k, goBackScene){
    // k.add([
    //     k.text("fight 02 level 3"),
    //     k.pos(100, 100)
    // ])
    function introDialogue() {

        player.isOnDialogue = true;
        console.log("the player is in dialogue? ", player.isOnDialogue);
        const resp = "Opción 1";
        dialogFigth(
            k,
            "¿Que es phising?",
            ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
            k.vec2(canvasWidth / 2, canvasHeight / 2),
            (selectedOption) => {
                console.log("Opción seleccionada:", selectedOption);
                if(selectedOption === resp){
                    k.setGravity(null)
                    goBackScene()
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
       

    const canvasWidth = k.width();
    const canvasHeight = k.height();

    const map = k.add([
        k.sprite("back_fight02_level03"),
        k.pos(0, -100),
        k.scale(3.2, 2),
    ])

    k.add([
        k.rect(canvasWidth, 200),
        k.pos(0, canvasHeight - 50),
        k.area(),
        k.body({isStatic: true}),
        k.color(k.Color.fromHex(("#240a25")))
    ]);


    const boss02 = k.add([
        k.sprite("second_boss_level_03"),
        k.pos(200, canvasHeight - 300),
        k.body(),
        k.area({shape: new k.Rect(k.vec2(0), 25, 80)}),
        k.anchor("center"),
        k.scale(6),
        {anim: "idle"}
    ])



    let player = k.add([
        k.sprite("character"),
        { anim: "idle" },
        k.area({
            shape: new k.Rect(new k.vec2(0), 18, 22)
        }),
        k.body(),
        k.anchor("center"),
        k.pos(canvasWidth - 200, canvasHeight - 30),
        k.scale(7),
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


    boss02.play("idle");
    player.play("idle");

    k.onKeyPress("u", () =>{
        goBackScene()
    }) 
    
    introDialogue();
}