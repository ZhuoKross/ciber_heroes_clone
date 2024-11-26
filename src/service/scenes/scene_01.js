//import { displayDialogue } from "../../utils/utils";
import dialog from "../dialog";

export default function scene01(k, goToNextScene, levelData) {

    // k.add([
    //     k.rect(200, 100),
    //     k.pos(100, 100)
    // ])


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
            }
        }

        if (layer.name === "colliders") {
            for (const obj of layer.objects) {
                if (obj.name === "player") {
                    player.pos = k.vec2(
                        (map.pos.x + obj.x + 400),
                        (map.pos.y + obj.y + 100)
                    )

                    k.add(player);  
                }

                if(obj.name === "info"){
                    map.add([
                        k.body({isStatic: true}),
                        k.area({shape: new k.Rect(k.vec2(0), obj.width, obj.height)}),
                        k.pos(obj.x, obj.y),
                        obj.name
                    ])

                    k.onCollide("player", obj.name, () => {
                        console.log("collision with object: ", obj.name);

                        dialog(k,"EXAMPLE TEXT BITCH YEAAAAAAHHHHH", k.vec2(k.camPos()), ()=> {
                            k.debug.log("yesss, it worksss");
                        })
                    })
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