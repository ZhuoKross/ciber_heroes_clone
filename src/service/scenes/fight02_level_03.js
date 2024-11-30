import dialogFigth from "../dialogFigth";
import { store, enemiesDefeated, playerIsOnDialogue } from "../store";


export default async function fightTwoLevelThree(k, goBackScene) {
    // k.add([
    //     k.text("fight 02 level 3"),
    //     k.pos(100, 100)
    // ])


    
    const canvasWidth = k.width();
    const canvasHeight = k.height();
    const enemiesCount = store.get(enemiesDefeated);



    function introDialogue() {




        store.set(playerIsOnDialogue, true);

        console.log("the player is in dialogue? ", store.get(playerIsOnDialogue));
        
        const resp = "d. Un tipo de estafa donde se engaña a la persona para que revele información personal";
        
        dialogFigth(
            k,
            "¿Que es phising?",
            ["a. Una técnica para crear contraseñas seguras", "b. Un sistema de cifrado de datos", "c. Un software que ayuda a proteger la información", "d. Un tipo de estafa donde se engaña a la persona para que revele información personal"],
            k.vec2(canvasWidth / 2, canvasHeight / 2),
            (selectedOption) => {
                console.log("Opción seleccionada:", selectedOption);
                if (selectedOption === resp) {

                    alert("Felicitaciones, Respondiste bien.")
                    
                    store.set(enemiesDefeated, [...enemiesCount, 1])
                    store.set(playerIsOnDialogue, false);
                    
                    k.setGravity(null)
                    
                    goBackScene()
                } else {
                    
                    alert("Respuesta Incorrecta, Intenta de nuevo");
                    store.set(playerIsOnDialogue, false);

                    goBackScene();
                }
            },
            () => {
                console.log("Diálogo cerrado");
                // Lógica adicional si el diálogo se cierra sin enviar
            }
        );
    }


    const map = k.add([
        k.sprite("back_fight02_level03"),
        k.pos(0, -100),
        k.scale(3.2, 2),
    ])

    k.add([
        k.rect(canvasWidth, 200),
        k.pos(0, canvasHeight - 50),
        k.area(),
        k.body({ isStatic: true }),
        k.color(k.Color.fromHex(("#240a25")))
    ]);


    const boss02 = k.add([
        k.sprite("second_boss_level_03"),
        k.pos(200, canvasHeight - 300),
        k.body(),
        k.area({ shape: new k.Rect(k.vec2(0), 25, 80) }),
        k.anchor("center"),
        k.scale(6),
        { anim: "idle" }
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

    k.onKeyPress("u", () => {
        goBackScene()
    })

    introDialogue();
}