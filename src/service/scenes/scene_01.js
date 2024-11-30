import dialog from "../dialog";
import {
    store,
    currentLevelAtom,
    curretPositionsPlayerAtom,
    isMusicPlaying,
    playerIsOnDialogue,
    enemiesDefeated
} from "../store";
import MusicControls from "../../utils/utils";
import Notification from "../../utils/notification";


export default async function scene01(
    k,
    changeScene,
    levelData,
    allPositions,
    firstFightLevelOne,
    secondFightLevelOne,
    thirdFightLevelOne
) {





    k.setGravity(null);

    const map = k.add([
        k.sprite("level-01"),
        k.scale(2),
        k.pos(100, 0),
        "map"
    ])

    const controls = MusicControls(k);
    const enemiesCount = store.get(enemiesDefeated);





    let player = k.make([
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
            currentPosition: {},
            currentLevel: "",
        },
        "player"
    ])

    console.log("data of positions", allPositions);

    player.currentPosition = store.get(curretPositionsPlayerAtom);
    player.currentLevel = store.get(currentLevelAtom);
    

    //player.currentPosition = store.get(curretPositionsPlayerAtom);
    //player.currentLevel = store.get(currentLevelAtom);

    console.log("data of the level 01: ", levelData);
    console.log("data fo the current level: ", player.currentLevel);
    console.log("current position: ", player.currentPosition);


    const SPEED = 250;

    function introDialogue() {

        dialog(k,
            "Tu misión comienza aqui, aprendiendo de los errores básicos de ciberseguridad. Tendrás que demostrar que sabes cómo proteger tu información personal. Cada respuesta correcta te acerca a la victoria. ¡Prepárate para proteger tus datos y vencer en tu primer combate!", // Texto del diálogo
            k.vec2(player.pos.x, player.pos.y + 100), // Posición basada en la cámara
            () => {
                if (store.get(isMusicPlaying) === false) {

                    store.set(isMusicPlaying, true);

                    controls.playMusic();
                } else {
                    controls.stopMusic();
                }

                store.set(playerIsOnDialogue, false);
                console.log("the player isn't in dialogue? ", store.get(playerIsOnDialogue));
            },
            () => {



                if (store.get(isMusicPlaying) === false) {

                    store.set(isMusicPlaying, true);

                    controls.playMusic();
                } else {
                    controls.stopMusic();
                }

                store.set(playerIsOnDialogue, false);
                console.log("the player is in dialogue? ", store.get(playerIsOnDialogue));
            });
    }




    for (const layer of levelData.layers) {

        if (layer.name === "positions") {
            for (const obj of layer.objects) {
                if (obj.name === "transition_positions") {
                    //var dataPositionTransition = obj;
                }
            }
        }

        if (layer.name === "limits") {
            for (const obj of layer.objects) {
                map.add([
                    k.body({ isStatic: true }),
                    k.pos(obj.x, obj.y),
                    k.area({ shape: new k.Rect(k.vec2(0), obj.width, obj.height) }),
                    obj.name
                ])



                if (obj.name === "passage") {
                    k.onCollide("player", obj.name, () => {

                        console.log("count of enemies: ", enemiesCount.length);
                        if (store.get(enemiesDefeated).length === 3) {

                            changeScene();

                        } else {
                            Notification(k, player);

                        }
                        //console.log("Enemies defeated: ", player.enemiesDefeated);
                    })
                }
            }
        }


        if (layer.name === "colliders") {
            for (const obj of layer.objects) {
                map.add([
                    k.body({ isStatic: true }),
                    k.area({ shape: new k.Rect(k.vec2(0), obj.width, obj.height) }),
                    k.pos(obj.x, obj.y),
                    obj.name
                ])

                if (obj.name === "fight_01") {
                    k.onCollide("player", obj.name, () => {
                        //console.log("collision with object: ", obj.name);

                        const PreguntaUno = "Mantener tus contraseñas seguras es clave para proteger tu información personal y cuentas en línea. Cambiar tus contraseñas regularmente, especialmente cada 3 a 6 meses, ayuda a minimizar riesgos como accesos no autorizados. Además, es importante usar contraseñas únicas para cada cuenta y evitar compartirlas."
                        dialog(
                            k,
                            PreguntaUno, // Texto del diálogo
                            k.vec2(k.camPos()), // Posición basada en la cámara
                            () => {
                                player.isOnDialogue = false;
                                console.log("the player isn't in dialogue");
                            },
                            () => {

                                firstFightLevelOne() // Ir a la siguiente escena
                            }
                        );
                    });
                }


                if (obj.name === "fight_02") {
                    k.onCollide("player", obj.name, () => {
                        const PreguntaUno = "En el mundo digital, tu información personal es valiosa. Para mantenerla segura, es importante usar contraseñas fuertes y difíciles de adivinar, combinando letras, números y símbolos, Cambiar tus contraseñas regularmente es una buena práctica, incluso si no crees que han sido descubiertas."
                        dialog(
                            k,
                            PreguntaUno, // Texto del diálogo
                            k.vec2(k.camPos()), // Posición basada en la cámara
                            () => {
                                player.isOnDialogue = false;
                                console.log("the player isn't in dialogue");
                            },
                            () => {
                                secondFightLevelOne(); // Ir a la siguiente escena
                            }
                        );
                    })
                }

                if (obj.name === "fight_03") {
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
                                thirdFightLevelOne(); // Ir a la siguiente escena
                            }
                        );

                    })
                }
            }
        }
    }


    //console.log("cantidad de enemigos derrotados: ", store.get(emeniesDefeated));


    if (player.currentPosition.x === allPositions.positions_level_01.spawn_position.x &&
        player.currentPosition.y === allPositions.positions_level_01.spawn_position.y &&
        player.currentLevel === "level_01") {
        console.log("first validation, spawn position");




        //await k.destroy(player);
        player.pos = k.vec2(
            (map.pos.x + player.currentPosition.x + 400),
            (map.pos.y + player.currentPosition.y + 100)
        )

        k.add(player);

    } else if (player.currentPosition.x === allPositions.positions_level_01.level_01_from_level_02.x &&
        player.currentPosition.y === allPositions.positions_level_01.level_01_from_level_02.y &&
        player.currentLevel === "level_01") {
        console.log("second validation, level_01_from_level_02 position");

        //await k.destroy(player);

        player.pos = k.vec2(
            (map.pos.x + player.currentPosition.x + 220),
            (map.pos.y + player.currentPosition.y + 300)
        )

        k.add(player);

    } else {
        console.log("Ninguna posición es tomada");

    }


    introDialogue();

    player.play("idle");

    // test function 
    // k.onKeyPress("u", () => {
    //     changeScene();
    // })



    k.onUpdate(() => {
        k.camPos(player.pos.x, player.pos.y + 100);
    })


    k.onKeyDown("a", () => {
        if (!store.get(playerIsOnDialogue)) {
            player.move(-SPEED, 0)
            if (player.getCurAnim().name !== "walk-left") {
                //console.log("name of the current animation:", player.getCurAnim().name)
                player.play("walk-left")
            }
        }
    })

    k.onKeyDown("w", () => {

        if (!store.get(playerIsOnDialogue)) {
            player.move(0, -SPEED)
            if (player.getCurAnim().name !== "walk-up") {
                //console.log("name of the current animation:", player.getCurAnim().name)
                player.play("walk-up")
            }
        }
    });

    k.onKeyDown("s", () => {

        if (!store.get(playerIsOnDialogue)) {
            player.move(0, SPEED)
            if (player.getCurAnim().name !== "walk-down") {
                //console.log("name of the current animation:", player.getCurAnim().name)
                player.play("walk-down")
            }
        }
    })

    k.onKeyDown("d", () => {

        if (!store.get(playerIsOnDialogue)) {
            player.move(SPEED, 0)

            if (player.getCurAnim().name !== "walk-right") {
                //console.log("name of the current animation:", player.getCurAnim().name)
                player.play("walk-right")
            }
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

    console.log("enemies Defeated: ", store.get(enemiesDefeated));
    console.log("pass all the 001 scene");

}