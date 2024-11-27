import { currentLevelAtom, curretPositionsPlayerAtom, store } from "../store";

export default function scene02(k, changeScene, goBackSceene, levelData, allPositions) {



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

    const SPEED = 250;

    console.log("data of the level 02: ", levelData);


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

        if(layer.name === "positions"){
            
            for(const obj of layer.objects){
                if (obj.name === "level_02_from_level_01") {

                    player.pos = k.vec2(
                        (map.pos.x + obj.x + 215),
                        (map.pos.y + obj.y + 40)
                    ),

                    k.add(player)

                }
            }
        }
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
            console.log("name of the current animation:", player.getCurAnim().name)
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