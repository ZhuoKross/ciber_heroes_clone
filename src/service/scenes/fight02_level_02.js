import dialogFigth from "../dialogFigth";
import { store, enemiesDefeated, playerIsOnDialogue } from "../store";
import Notification from "../../utils/notification";


export default async function fightTwoLevelTwo(k, goBackScene) {

    const canvasWidth = k.width();
    const canvasHeight = k.height();
    const enemiesCount = store.get(enemiesDefeated);

    function introDialogue() {

        store.set(playerIsOnDialogue, true);

        console.log("the player is in dialogue? ", store.get(playerIsOnDialogue));

        const resp = "c. No hacer clic y verificar primero el remitente";
        
        dialogFigth(
            k,
            "¿Qué debes hacer si recibes un correo sospechoso con un enlace?",
            ["a. Responder al correo para obtener más información ", "b. Hacer clic para ver de qué se trata", "c. No hacer clic y verificar primero el remitente", "d. Reenviar el correo a tus contactos"],
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
    k.add([
        k.sprite("background_figth_02_Three"),
        k.pos(0),
        k.scale(3.2, 2.9),
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
        k.rect(canvasWidth, 200),
        k.pos(0, canvasHeight - 50),
        k.area(),
        k.body({isStatic: true}),
        k.color(k.Color.fromHex(("#2e4053")))
    ])

    const enemies_02_three = k.add([
        k.sprite("enemies_02_three"),
        k.pos(200, canvasHeight - 50),
        k.area({
            shape: new k.Rect(k.vec2(0), 30, 30)
        }),
        k.body(),
        {anim: "idle"},
        k.anchor("center"),
        k.scale(7)
    ])
   // Add the player to the scene
   k.add(player)
   player.play("idle");
   enemies_02_three.play("idle")
    introDialogue();
}