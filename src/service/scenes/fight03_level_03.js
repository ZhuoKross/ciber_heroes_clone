import dialogFigth from "../dialogFigth";
export default async function fightThreeLevelThree(k, goBackScene) {
    // k.add([
    //     k.text("fight 03 level 3"),
    //     k.pos(100, 100)
    // ])


    const canvasWidth = k.width();
    const canvasHeight = k.height();

    const map = k.add([
        k.sprite("back_fight03_level03"),
        k.pos(0),
        k.scale(1.7, 0.8)
    ])

    k.add([
        k.rect(canvasWidth, 200),
        k.pos(0, canvasHeight - 50),
        k.area(),
        k.body({ isStatic: true }),
        k.color(k.Color.fromHex(("#020232")))
    ]);

    function introDialogue() {

        player.isOnDialogue = true;
        console.log("the player is in dialogue? ", player.isOnDialogue);
        const resp = "b. Un virus que afecta el funcionamiento de tu dispositivo";
        dialogFigth(
            k,
            "¿Cuál de los siguientes es un ejemplo de 'malware'?",
            ["a. Una aplicación de banca segura", "b. Un virus que afecta el funcionamiento de tu dispositivo", "c.	Un sistema operativo actualizado", "d. Un archivo adjunto en un correo de un desconocido."],
            k.vec2(canvasWidth / 2, canvasHeight / 2),
            (selectedOption) => {
                console.log("Opción seleccionada:", selectedOption);
                if (selectedOption === resp) {
                    k.setGravity(null)
                    goBackScene()
                } else {
                    alert("lastima sapa")
                }
            },
            () => {
                console.log("Diálogo cerrado");
                // Lógica adicional si el diálogo se cierra sin enviar
            }
        );
    }


    const boss03 = k.add([
        k.sprite("third_boss_level_03"),
        k.pos(300, 400),
        k.body(),
        k.area({ shape: new k.Rect(k.vec2(0), 25, 180) }),
        k.anchor("center"),
        k.scale(3),
        { anim: "idle" }
    ])

    let player = k.add([
        k.sprite("character"),
        { anim: "idle" },
        k.area({
            shape: new k.Rect(new k.vec2(0), 18, 18)
        }),
        k.body(),
        k.anchor("center"),
        k.pos(canvasWidth - 100, canvasHeight - 50),
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


    boss03.play("idle");
    player.play("idle");

    k.onKeyPress("u", () => {
        goBackScene()
    })

    introDialogue();
}