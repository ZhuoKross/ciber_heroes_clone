import { currentLevelAtom, curretPositionsPlayerAtom, store } from "../store";
import dialog from "../dialog";

export default async function (
    k,
    goToNextScene,
    levelData,
    allPositions,
    firstFightLevelThree,
    secondFightLevelThree,
    thirdFightLevelOThree
) {


    const map = k.add([
        k.sprite("level-03"),
        k.scale(2),
        k.pos(100, 50)
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

    console.log("data of positions", allPositions);

    player.currentPosition = store.get(curretPositionsPlayerAtom);
    player.currentLevel = store.get(currentLevelAtom);



    const SPEED = 250;

    console.log("data of the level 03: ", levelData);
    console.log("data fo the current level: ", player.currentLevel);
    console.log("current position level 03: ", player.currentPosition);


    for (const layer of levelData.layers) {

        if (layer.name === "limits") {
            for (const obj of layer.objects) {
                map.add([
                    k.body({ isStatic: true }),
                    k.pos(obj.x, obj.y),
                    k.area({ shape: new k.Rect(new k.vec2(0), obj.width, obj.height) }),
                    obj.name
                ]);


                if (obj.name === "passage") {
                    console.log("enter")
                    k.onCollide("player", obj.name, () => {
                        goToNextScene();
                    })
                }
            }
        }

        if (layer.name === "colliders") {
            for (const obj of layer.objects) {
                map.add([
                    k.body({ isStatic: true }),
                    k.pos(obj.x, obj.y),
                    k.area({ shape: new k.Rect(new k.vec2(0), obj.width, obj.height) }),
                    obj.name
                ]);

                if (obj.name === "fight_01") {
                    k.onCollide("player", obj.name, () => {
                       const PreguntaUno = "Los ciberdelincuentes suelen utilizar enlaces falsos para engañar y robar información personal o instalar software malicioso. Una señal común de un enlace sospechoso es que contenga errores de ortografía, caracteres extraños o un dominio que no coincide con la organización legítima (Ej: “amaz0n.com” en lugar de “amazon.com”). "
                            dialog(
                                k,
                                PreguntaUno, // Texto del diálogo
                                k.vec2(k.camPos()), // Posición basada en la cámara
                                () => {
                                    player.isOnDialogue = false;
                                    console.log("the player isn't in dialogue");
                                },
                                () => {
                                    firstFightLevelThree(); // Ir a la siguiente escena
                                }
                            );                        
                    })
                }
    
                if(obj.name === "fight_02"){
                    k.onCollide("player", obj.name, () => {
                        const PreguntaUno = "Los ciberdelincuentes suelen utilizar enlaces falsos para engañar y robar información personal o instalar software malicioso. Una señal común de un enlace sospechoso es que contenga errores de ortografía, caracteres extraños o un dominio que no coincide con la organización legítima (Ej: “amaz0n.com” en lugar de “amazon.com”). "
                        dialog(
                            k,
                            PreguntaUno, // Texto del diálogo
                            k.vec2(k.camPos()), // Posición basada en la cámara
                            () => {
                                player.isOnDialogue = false;
                                console.log("the player isn't in dialogue");
                            },
                            () => {
                              secondFightLevelThree();   // Ir a la siguiente escena
                            }
                        );     
                        
                        
                    })
                }

                if(obj.name === "fight_03"){
                    k.onCollide("player", obj.name, () => {
                        const PreguntaUno = "Los ciberdelincuentes suelen utilizar enlaces falsos para engañar y robar información personal o instalar software malicioso. Una señal común de un enlace sospechoso es que contenga errores de ortografía, caracteres extraños o un dominio que no coincide con la organización legítima (Ej: “amaz0n.com” en lugar de “amazon.com”). "
                        dialog(
                            k,
                            PreguntaUno, // Texto del diálogo
                            k.vec2(k.camPos()), // Posición basada en la cámara
                            () => {
                                player.isOnDialogue = false;
                                console.log("the player isn't in dialogue");
                            },
                            () => {
                             thirdFightLevelOThree();    // Ir a la siguiente escena
                            }
                        );     
                       
                    })
                }
            }

            
        }
    }




    if (player.currentPosition.x === allPositions.positions_level_03.level_03_from_level_02.x &&
        player.currentPosition.y === allPositions.positions_level_03.level_03_from_level_02.y &&
        player.currentLevel === "level_03") {
        console.log("first validation, spawn position level 02");


        if (k.get("player")) {

            console.log("enter validation exist")
            await k.destroy(player);
            console.log("element exists: ", k.get("player"))
        }

        //await k.destroy(player);
        player.pos = k.vec2(
            (map.pos.x + player.currentPosition.x + 130),
            (map.pos.y + player.currentPosition.y + 380)
        )

        k.add(player);

    } else {
        console.log("Ninguna posición es tomada");

    }





    player.play("idle");



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