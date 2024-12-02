import dialogFigth from "../dialogFigth";
import { enemiesDefeated, playerIsOnDialogue, store } from "../store";
import Notification from "../../utils/notification";


export default async function figthTwo(k, backScene) {


    const canvasWidth = k.width();
    const canvasHeight = k.height();
    const enemiesCount = store.get(enemiesDefeated);

    function introDialogue() {

        store.set(playerIsOnDialogue, true)
        console.log("the player is in dialogue? ", store.get(playerIsOnDialogue));
        const resp = "a. Usar combinaciones de letras, números y símbolos";
        dialogFigth(
            k,
            "¿Cuál de las siguientes es una buena práctica al crear una contraseña?",
            ["a. Usar combinaciones de letras, números y símbolos", "b.	Usar solo tu nombre y fecha de nacimiento", "c. Usar solo palabras comunes", "d. Elegir una palabra fácil de recordar"],
            k.vec2(canvasWidth / 2, canvasHeight / 2),
            (selectedOption) => {
                console.log("Opción seleccionada:", selectedOption);
                if (selectedOption === resp) {

                    Notification(
                        k,
                        player,
                        k.vec2(canvasWidth / 2, canvasHeight / 2),
                        "¡Muy Bien! Has respondido Correctamente",
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

    k.add([
        k.sprite("01_"),
        k.pos(0),
        k.scale(2.9, 2.5),
    ])

    k.add([
        k.sprite("02_"),
        k.pos(10, 100),
        k.scale(2.9, 2.5),
    ])

    k.add([
        k.sprite("03_"),
        k.pos(0),
        k.scale(2.9, 2.5),
    ])

    k.add([
        k.sprite("04_"),
        k.pos(0),
        k.scale(2.9, 2.5),

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
    const enemies_two = k.add([
        k.sprite("enemies_two"),
        k.pos(200, canvasHeight - 50),
        k.area({
            shape: new k.Rect(k.vec2(0), 30, 30)
        }),
        k.body(),
        { anim: "idle" },
        k.anchor("center"),
        k.scale(8)
    ])

    const gravity = 200;

    k.setGravity(gravity);

    k.add(player);
    enemies_two.play("idle");
    player.play("idle");
    introDialogue();


}