import dialogFigth from "../dialogFigth";
import { store, enemiesDefeated, playerIsOnDialogue } from "../store";
import Notification from "../../utils/notification";


export default async function fight02(k, goBackScene){
    const background = k.add ([
        k.sprite("background_level_02"),
        k.scale(1, 0.9),
        k.pos(-150, 0)
    ])

    const canvasWidth = k.width();
    const canvasHeight = k.height();
    const enemiesCount = store.get(enemiesDefeated);

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
        k.pos(canvasWidth - 100, canvasHeight - 100),
        k.scale(9),
        {
            speed: 200,
            direction: "left",
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

        store.set(playerIsOnDialogue, true);

        console.log("the player is in dialogue? ", store.get(playerIsOnDialogue));

        const resp = "a. Un correo que pide información personal urgente";
        
        dialogFigth(
            k,
            "¿Cuál de los siguientes correos es más probable que sea falso o malicioso?",
            ["a. Un correo que pide información personal urgente", "b. Un correo de un amigo", "c. Un correo de bienvenida a un servicio al que te suscribiste", "d. Un correo con consejos para mejorar la seguridad"],
            k.vec2(canvasWidth / 2, canvasHeight / 2),
            (selectedOption) => {
                console.log("Opción seleccionada:", selectedOption);
                if(selectedOption === resp){
                    Notification(
                        k,
                        player,
                        k.vec2(canvasWidth / 2, canvasHeight / 2),
                        "¡Muy Bien! Has respondido Correctamente",
                        "win",
                        () => { goBackScene(); }
                    );


                    store.set(enemiesDefeated, [...enemiesCount, 1])
                    
                    k.setGravity(null)
                    
                }else{
                    alert("Respuesta Incorrecta, Intenta de nuevo");
                    goBackScene();
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