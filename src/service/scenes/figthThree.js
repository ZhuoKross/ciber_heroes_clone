import dialogFigth from "../dialogFigth";
import { enemiesDefeated, playerIsOnDialogue, store } from "../store";

export default async function figthThree(k, backScene) {
    
    const canvasWidth = k.width();
    const canvasHeight = k.height();
    const enemiesCount = store.get(enemiesDefeated);

    
    function introDialogue() {
    console.log("aqui estoy")
        store.set(playerIsOnDialogue, true);

        console.log("the player is in dialogue? ", store.get(playerIsOnDialogue));
        const resp = "b. Contiene errores de ortografía o caracteres extraños";
        dialogFigth(
            k,
            "¿Cuál es una señal de que un enlace podría ser falso o peligroso?",
            ["a. Tiene un nombre largo ", "b. Contiene errores de ortografía o caracteres extraños", "c.	No tiene imágenes", "d.	Es compartido por un amigo"],
            k.vec2(canvasWidth / 2, canvasHeight / 2),
            (selectedOption) => {
                console.log("Opción seleccionada:", selectedOption);
                if(selectedOption === resp){
                    store.set(enemiesDefeated, [...enemiesCount, 1])
                    store.set(playerIsOnDialogue, false);
                    
                    backScene();
                }else{
                    alert("Respuesta Incorrecta, Intenta de nuevo");
                    store.set(playerIsOnDialogue, false);
                    
                    backScene();
                }
            },
            () => {
                console.log("Diálogo cerrado");
                // Lógica adicional si el diálogo se cierra sin enviar
            }
        );
        
    }

    const background = k.add ([
        k.sprite("background_figthThree"),
        k.scale(4.2, 4.2),
        k.pos(0, 0)
    ])
   

    k.add([
        k.rect(canvasWidth, 200),
        k.pos(0, canvasHeight - 50),
        k.area(),
        k.body({isStatic: true}),
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
    ]);

    
    const enemies_01_three = k.add([
        k.sprite("enemies_01_three"),
        k.pos(200, canvasHeight - 50),
        k.area({
            shape: new k.Rect(k.vec2(0), 30, 30)
        }),
        k.body(),
        {anim: "idle"},
        k.anchor("center"),
        k.scale(8)
    ])

    const gravity = 200;

    k.setGravity(gravity);
    k.add(player);
    

   // Add the player to the scene
   enemies_01_three.play("idle")
   player.play("idle");
   introDialogue();
    
    
}