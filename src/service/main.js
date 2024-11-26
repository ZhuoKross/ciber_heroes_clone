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
        k.go(nextScene);
    }

    function backScene(scene){
        k.go(scene);
    }


    // UPLOADING THE DATA OF THE LEVELS


    const level01 = await fetch("./assets/map_01_ciber_heroes.json").then(res => res.json());
    const level02 = await fetch("./assets/level_02_ciber_heroes.json").then(res => res.json());
    const level03 = await fetch("./assets/level_03_ciber_heroes.json").then(res => res.json());




    // FOR THE POSITIONS OF THE EACH LEVEL

    const posLevel01 = {};
    const posLevel02 = {};
    const posLevel03 = {};

    const allPositions = {
        "positions_level_01": posLevel01,
        "positions_level_02": posLevel02,
        "positions_level_03": posLevel03
    }

    // LEVEL 01
    for (const layer of level01.layers){
        if(layer.name === "positions"){
            for (const obj of layer.objects){
                if(obj.name === "spawn_position"){
                    posLevel01["spawn_position"] = {"x": obj.x, "y": obj.y};
                }
                else if(obj.name === "level_01_from_level_02"){
                    posLevel01["level_01_from_level_02"] = {"x": obj.x, "y": obj.y};
                }
            }
        }
    }

    // LEVEL 02
    for(const layer of level02.layers){
        if(layer.name === "positions"){
            for(const obj of layer.objects){
                if(obj.name === "level_02_from_level_01"){
                    posLevel02["level_02_from_level_01"] =  {"x": obj.x, "y": obj.y};
                }
                else if(obj.name === "level_02_from_level_03"){
                    posLevel02["level_02_from_level_03"] = {"x": obj.x, "y": obj.y};
                }
            }
        }
    }


    // LEVEL 03
    for (const layer of level03.layers){
        if(layer.name === "colliders"){
            for(const obj of layer.objects){
                if(obj.name === "level_03_from_level_02"){
                    posLevel03["level_03_from_level_02"] = {"x": obj.x, "y": obj.y}; 
                }
            }
        }
    }


    // DEFINING THE SCENES OF THE GAME
    k.scene("scene01", () => {
        scene01(k, () => { changeScene("scene02") }, level01, allPositions);
    })
    
    k.scene("scene02", () => {
        scene02(k, () => { changeScene("scene03") }, () => { backScene("scene01")}, level02);
    })

    k.scene("scene03", () => {
        scene03(k, () => { changeScene("scene02") }, level03);
    })




    



    // VALIDATING THE POSITIONS OF EACH LEVEL
    // console.log("Positions of level 01: ", posLevel01);
    // console.log("Positions of level 02: ", posLevel02);
    // console.log("Positions of level 03: ", posLevel03);
    console.log("all pos: ", allPositions);


    // FUNTION TO THE TRANSITION BETWEEN SCENES
    // function transitionLevel(newLevel, newPosition){
    //     const DataPositions = {
    //         currentLevel: newLevel,
    //         newPosition: newPosition
    //     }

    //     return DataPositions;

    // }





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

