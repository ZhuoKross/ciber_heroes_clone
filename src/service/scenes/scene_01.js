import dialog from "../dialog";
import { store, currentLevelAtom, curretPositionsPlayerAtom } from "../store";


export default async function scene01(k, changeScene, levelData, allPositions) {


    const map = k.add([
        k.sprite("level-01"),
        k.scale(2),
        k.pos(100, 0),
        "map"
    ])



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

    //player.currentPosition = store.get(curretPositionsPlayerAtom);
    //player.currentLevel = store.get(currentLevelAtom);

    console.log("data of the level 01: ", levelData);
    console.log("data fo the current level: ", player.currentLevel);
    console.log("current position: ", player.currentPosition);


    const SPEED = 250;



    for (const layer of levelData.layers) {

        if(layer.name === "positions"){
            for(const obj of layer.objects){
                if(obj.name === "transition_positions"){
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

                player.enemiesDefeated = 3;

                if (obj.name === "passage") {
                    k.onCollide("player", obj.name, () => {
                        //console.log("colllision with: ", obj.name);
                        if (player.enemiesDefeated === 3) {

                            changeScene();

                        } else {
                            k.debug.log("No puedes pasar. No has derrotado a todos lo enemigos :(")
                        }
                        //console.log("Enemies defeated: ", player.enemiesDefeated);
                    })
                }
            }
        }


        if (layer.name === "colliders") {
            for (const obj of layer.objects) {
                if (obj.name === "info") {
                    map.add([
                        k.body({ isStatic: true }),
                        k.area({ shape: new k.Rect(k.vec2(0), obj.width, obj.height) }),
                        k.pos(obj.x, obj.y),
                        obj.name
                    ])
                    k.onCollide("player", obj.name, () => {
                        //console.log("collision with object: ", obj.name);

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
                                changeScene(); // Ir a la siguiente escena
                            }
                        );
                    });




                }
            }
        }
    }

    
    


    if (player.currentPosition.x === allPositions.positions_level_01.spawn_position.x && 
        player.currentPosition.y === allPositions.positions_level_01.spawn_position.y && 
        player.currentLevel === "level_01")
        {
        console.log("first validation, spawn position");


       

        //await k.destroy(player);
        player.pos = k.vec2(
            (map.pos.x + player.currentPosition.x + 400),
            (map.pos.y + player.currentPosition.y + 100)
        )

        k.add(player);

    } else if ( player.currentPosition.x === allPositions.positions_level_01.level_01_from_level_02.x && 
                player.currentPosition.y === allPositions.positions_level_01.level_01_from_level_02.y &&
                player.currentLevel === "level_01") {
        console.log("second validation, level_01_from_level_02 position");
        
        //await k.destroy(player);

        player.pos = k.vec2(
            (map.pos.x + player.currentPosition.x + 220),
            (map.pos.y + player.currentPosition.y + 300)
        )

        k.add(player);
    
    }else{
        console.log("Ninguna posición es tomada");
    
    }


    // const existAlready = k.get("player");

    // if (existAlready.length >= 1) {

    //     console.log("enter validation exist")
    //     //await k.destroy();
    //     console.log("element exists: ", existAlready)
    // }


    player.play("idle");


    k.onKeyPress("u", () => {
        changeScene();
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

    console.log("pass all the 001 scene");

}