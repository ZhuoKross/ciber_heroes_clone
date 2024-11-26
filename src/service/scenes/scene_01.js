//import { displayDialogue } from "../../utils/utils";
import dialog from "../dialog";

export default function scene01(k, goToNextScene, levelData, allPositions) {

    const map = k.add([
        k.sprite("level-01"),
        k.scale(2),
        k.pos(100, 0)
    ])

    const player = k.make([
        k.sprite("character"),
        { anim: "idle" },
        k.area({
            shape: new k.Rect(new k.vec2(0), 18, 18)
        }),
        k.body(),
        k.anchor("center"),
        k.pos(),
        k.scale(3),
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

    const SPEED = 250;

    console.log("data of the level 01: ", levelData);

    for (const layer of levelData.layers) {

        if (layer.name === "limits") {
            for (const obj of layer.objects) {
                map.add([
                    k.body({ isStatic: true }),
                    k.pos(obj.x, obj.y),
                    k.area({ shape: new k.Rect(k.vec2(0), obj.width, obj.height) }),
                    obj.name
                ])

                player.enemiesDefeated = 3;

                if(obj.name === "passage"){
                    k.onCollide("player", obj.name, () => {
                        if(player.enemiesDefeated === 3){
                            
                            goToNextScene("scene02");
                            
                            //player.pos =  new k.vec2(dataPositionTransition.x, dataPositionTransition.y);
                            
                        }else{
                            k.debug.log("No puedes pasar. No has derrotado a todos lo enemigos :(")
                        }
                        //console.log("Enemies defeated: ", player.enemiesDefeated);
                    })
                }
            }
        }

        if(layer.name === "positions"){
            for (const obj of layer.objects){
                if (obj.name === "spawn_position") {
                    player.pos = k.vec2(
                        (map.pos.x + allPositions.positions_level_01.spawn_position.x + 400),
                        (map.pos.y + allPositions.positions_level_01.spawn_position.y + 100)
                    )

                    //player.currentPosition = {"x": allPositions.}

                    k.add(player);  
                }
            }
        }

        if (layer.name === "colliders") {
            for (const obj of layer.objects) {
                if(obj.name === "info"){
                    map.add([
                        k.body({isStatic: true}),
                        k.area({shape: new k.Rect(k.vec2(0), obj.width, obj.height)}),
                        k.pos(obj.x, obj.y),
                        obj.name
                    ])
                    k.onCollide("player", obj.name, () => {
                        console.log("collision with object: ", obj.name);
                    
                        const PreguntaUno = "Aqui esta la pregunta"
                        dialog(
                            k,
                            PreguntaUno, // Texto del diálogo
                            k.vec2(k.camPos()), // Posición basada en la cámara
                            () => {
                                k.debug.log("Diálogo cerrado"); // Función de cierre
                            },
                            () => {
                                k.debug.log("Pasando a la siguiente escena"); // Función para cambiar de escena
                                k.go("nextScene"); // Ir a la siguiente escena
                            }
                        );
                    });
                    
                    
                    
                                                 
                }
            }
        }
    }

    player.play("idle");



    k.onKeyPress("u", () => {
        goToNextScene();
    })

    k.onUpdate(() => {
        k.camPos(player.pos.x, player.pos.y + 100);
    })


    k.onKeyDown("a", () => {
        player.move(-SPEED, 0)
        if (player.getCurAnim().name !== "walk-left") {
            //console.log("name of the current animation:", player.getCurAnim().name)
            player.play("walk-left")
        }
    })

    k.onKeyDown("w", () => {
        player.move(0, -SPEED)

        if (player.getCurAnim().name !== "walk-up") {
            //console.log("name of the current animation:", player.getCurAnim().name)
            player.play("walk-up")
        }
    });

    k.onKeyDown("s", () => {
        player.move(0, SPEED)

        if (player.getCurAnim().name !== "walk-down") {
            //console.log("name of the current animation:", player.getCurAnim().name)
            player.play("walk-down")
        }
    })

    k.onKeyDown("d", () => {
        player.move(SPEED, 0)

        if (player.getCurAnim().name !== "walk-right") {
            //console.log("name of the current animation:", player.getCurAnim().name)
            player.play("walk-right")
        }
    })

    const keys = ["w", "a", "s", "d"];

    keys.forEach(key => {
        k.onKeyRelease(key, () => {
            if (!k.isKeyDown("w") || !k.isKeyDown("a") || k.isKeyDown("s") || k.isKeyDown("d")) {
                player.play("idle");
            }
        })
    });

}