
import dialogFigth from "../dialogFigth";
export default async function fightThreeLevelTwo(k, goBackScene){

    const canvasWidth = k.width();
    const canvasHeight = k.height();

    function introDialogue() {

        player.isOnDialogue = true;
        console.log("the player is in dialogue? ", player.isOnDialogue);
        const resp = "d. Para evitar que otras personas accedan a tu información ";
        dialogFigth(
            k,
            "¿Por qué es importante usar una red Wi-Fi segura en lugares públicos?",
            ["a. Para descargar contenido más rápido ", "b. Para aumentar la velocidad de conexión", "c. Para evitar consumir la batería rápidamente", "d. Para evitar que otras personas accedan a tu información "],
            k.vec2(canvasWidth / 2, canvasHeight / 2),
            (selectedOption) => {
                console.log("Opción seleccionada:", selectedOption);
                if(selectedOption === resp){
                    k.setGravity(null)
                    goBackScene();
                }else{
                    alert("lastima sapa");
                    goBackScene();
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
        k.pos(canvasWidth - 100, canvasHeight - 100),
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
    
    const enemies_02_two = k.add([
        k.sprite("enemies_02_two"),
        k.pos(200, canvasHeight - 50),
        k.area({
            shape: new k.Rect(k.vec2(0), 30, 30)
        }),
        k.body(),
        {anim: "idle"},
        k.anchor("center"),
        k.scale(7)
    ])

    k.onKeyPress("u", ()=> {
        goBackScene();
    })

    const gravity = 200;

    
    
    k.add([
        k.rect(canvasWidth, 200),
        k.pos(0, canvasHeight - 50),
        k.area(),
        k.body({isStatic: true}),
        k.color(k.Color.fromHex(("#2e4053")))
    ])
   // Add the player to the scene
   k.setGravity(gravity);
   k.add(player);
   enemies_02_two.play("idle")
   player.play("idle");
    introDialogue();
}