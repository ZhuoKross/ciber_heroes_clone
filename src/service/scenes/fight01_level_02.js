import dialogFigth from "../dialogFigth";

export default async function fight02(k, goBackScene){
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


    const monster = k.add([
        k.sprite("monster"),
        k.pos(180, + 550),
        k.area({
            shape: new k.Rect(k.vec2(0), 30, 40)
        }),
        k.body(),
        {anim: "idle"},
        k.anchor("center"),
        k.scale(6)
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
        k.scale(9),
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


    const gravity = 200;

    k.setGravity(gravity);


    monster.play("idle");
    player.play("idle");

    k.add(player);


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
         introDialogue();
}