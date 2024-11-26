import scene01 from "./scenes/scene_01";
import scene02 from "./scenes/scene_02";
import scene03 from "./scenes/scene-03";
import context from "./kaplayContext";



export default async function main() {



    // GETTING THE CONTEXT OF KAPLAY
    const k = context();

    k.setBackground(k.Color.fromHex("424050"))

    // FUNTION TO PASS THROUGHT SCENES 
    function changeScene(nextScene) {
        k.go(nextScene)
    }


    // UPLOADING THE DATA OF THE LEVELS


    const level01 = await fetch("./assets/map_01_ciber_heroes.json").then(res => res.json());
    const level02 = await fetch("./assets/level_02_ciber_heroes.json").then(res => res.json());
    const level03 = await fetch("./assets/level_03_ciber_heroes.json").then(res => res.json());



    // DEFINING THE SCENES OF THE GAME
    k.scene("scene01", () => {
        scene01(k, () => { changeScene("scene02") }, level01);
    })

    k.scene("scene03", () => {
        scene03(k, () => { changeScene("scene02") }, level02);
    })

    k.scene("scene02", () => {
        scene02(k, () => { changeScene("scene03") }, level03);
    })



    // UPLOADING THE SPRITES AND ASSETS
    try {

        //        SPRITE FOR THE CHARACTER EXAMPLE
        await k.loadSprite("character", "/assets/spriteSheet_character_ciber_heroes.png", {
            sliceX: 4,
            sliceY: 5,
            anims: {
                "down-idle": 13,
                "up-idle": 17,
                "right-idle": 4,
                "left-idle": 8,
                "idle": {
                    from: 0,
                    to: 3,
                    loop: true,
                    speed: 5
                },
                "walk-right": {
                    from: 4,
                    to: 7,
                    loop: true,
                    speed: 5
                },
                "walk-left": {
                    from: 8,
                    to: 11,
                    loop: true,
                    speed: 5
                },
                "walk-down": {
                    from: 12,
                    to: 15,
                    loop: true,
                    speed: 5
                },
                "walk-up": {
                    from: 16,
                    to: 19,
                    loop: true,
                    speed: 5
                }

            }
        })


        console.log("character uploaded succesfully");


        k.loadSprite("level-01", "/assets/map_01_ciber_heroes.png")
        console.log("level 01 uploaded succesfully");


        k.loadSprite("level-02", "/assets/level_02_ciber_heroes.png")
        console.log("level 02 uploaded succesfully");


        k.loadSprite("level-03", "/assets/level_03_ciber_heroes.png")
        console.log("level o3 uploaded successfully");

    } catch (error) {
        console.log("Error uploading sprites and assets: ", error);
    }




    k.go("scene01")
}

