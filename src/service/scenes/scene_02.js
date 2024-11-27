import { currentLevelAtom, curretPositionsPlayerAtom, store } from "../store";

export default async function scene02(k, changeScene, goBackSceene, levelData, allPositions) {



    const map = k.add([
        k.sprite("level-02"),
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


    console.log("data of positions", allPositions);

    player.currentPosition = store.get(curretPositionsPlayerAtom);
    player.currentLevel = store.get(currentLevelAtom);


    const SPEED = 250;

    console.log("data of the level 02: ", levelData);
    console.log("data fo the current level: ", player.currentLevel);
    console.log("current position level 02: ", player.currentPosition);


    for (const layer of levelData.layers) {
        
        if (layer.name === "limits") {
            
            for (const obj of layer.objects) {
                map.add([
                    k.body({ isStatic: true }),
                    k.pos(obj.x, obj.y),
                    k.area({ shape: new k.Rect(new k.vec2(0), obj.width, obj.height) }),
                    obj.name
                ]);

                if (obj.name === "passage_back") {
                    k.onCollide("player", obj.name, () => {
                        goBackSceene();
                    })
                }

                if(obj.name === "passage"){
                    k.onCollide("player", obj.name, () => {
                        changeScene();
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
                ]);
            }

        }
    }




    if (player.currentPosition.x === allPositions.positions_level_02.level_02_from_level_01.x && 
        player.currentPosition.y === allPositions.positions_level_02.level_02_from_level_01.y && 
        player.currentLevel === "level_02")
        {
        console.log("first validation, spawn position level 02");


        if (k.get("player")) {

            console.log("enter validation exist")
            await k.destroy(player);
            console.log("element exists: ", k.get("player"))
        }

        //await k.destroy(player);
        player.pos = k.vec2(
            (map.pos.x + player.currentPosition.x + 230),
            (map.pos.y + player.currentPosition.y + 30)
        )

        k.add(player);

    } else if ( player.currentPosition.x === allPositions.positions_level_02.level_02_from_level_03.x &&
                player.currentPosition.y === allPositions.positions_level_02.level_02_from_level_03.y && 
                player.currentLevel === "level_02") 
    {

        console.log("second validation, level_02_from_level_03 position");
        
        //await k.destroy(player);

        player.pos = k.vec2(
            (map.pos.x + player.currentPosition.x + 340),
            (map.pos.y + player.currentPosition.y + 300)
        )

        k.add(player);
    
    }else{
        console.log("Ninguna posición es tomada");
    
    }




    player.play("idle");



    

    k.onUpdate(() => {
        k.camPos(player.pos.x, player.pos.y + 100);
    })

    k.onKeyPress("u", ()=>{
        changeScene();
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


    const valueCurLevel = store.get(currentLevelAtom);
    const valueCurPos = store.get(curretPositionsPlayerAtom);
    console.log("value of the level from scene 02: ", valueCurLevel);
    console.log("value of the current position from scene 02: ", valueCurPos);
}