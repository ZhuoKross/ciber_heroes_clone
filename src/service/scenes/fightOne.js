import dialogFigth from "../dialogFigth";
import { enemiesDefeated, playerIsOnDialogue, store } from "../store";
import Notification from "../../utils/notification";


export default async function figthOne(k, backScene) {

    const canvasWidth = k.width();
    const canvasHeight = k.height();
    const enemiesCount = store.get(enemiesDefeated);


    function introDialogue() {

        store.set(playerIsOnDialogue, true);

        console.log("the player is in dialogue? ", store.get(playerIsOnDialogue));
        const resp = "c. Cada 3 a 6 meses";
        dialogFigth(
            k,
            "¿Qué tan frecuentemente se recomienda cambiar tus contraseñas?",
            ["a. Solo cuando alguien la descubre ", "b.	Cada año", "c. Cada 3 a 6 meses", "d. Nunca, si es fuerte"],
            k.vec2(canvasWidth / 2, canvasHeight / 2),
            (selectedOption) => {
                console.log("Opción seleccionada:", selectedOption);
                if (selectedOption === resp) {

                    Notification(
                        k,
                        player,
                        k.vec2(canvasWidth / 2, canvasHeight / 2),
                        "¡Muy Bien! Has respondido Correctamente y derratodo al primer enemigo",
                        "win",
                        () => { backScene(); }
                    );

                    store.set(enemiesDefeated, [...enemiesCount, 1])

                } else {
                    alert("Respuesta Incorrecta, Intenta de nuevo");
                    
                    backScene();
                }
            },
            () => {
                console.log("Diálogo cerrado");
                // Lógica adicional si el diálogo se cierra sin enviar
            }
        );

    }

    const background = k.add([
        k.sprite("background_level_02"),
        k.scale(1, 0.9),
        k.pos(-150, 0)
    ])


    k.add([
        k.rect(canvasWidth, 200),
        k.pos(0, canvasHeight - 50),
        k.area(),
        k.body({ isStatic: true }),
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
        k.pos(canvasWidth - 100, canvasHeight - 50),
        k.scale(8),
        {
            speed: 200,
            direction: "left",
            currentPosition: {},
            currentLevel: "",
        },
        "player"
    ])
    const enemies_one = k.add([
        k.sprite("enemies_one"),
        k.pos(200, canvasHeight - 50),
        k.area({
            shape: new k.Rect(k.vec2(0), 30, 40)
        }),
        k.body(),
        { anim: "idle" },
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
