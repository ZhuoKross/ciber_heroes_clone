import scene01 from "./scenes/scene_01";
import scene02 from "./scenes/scene_02";
import scene03 from "./scenes/scene-03";
import context from "./kaplayContext";
import { store, currentLevelAtom, curretPositionsPlayerAtom } from "./store";
import figthOne from "./scenes/fightOne";
import fight02 from "./scenes/fight01_level_02";

export default async function main() {



    
    // GETTING THE CONTEXT OF KAPLAY
    const k = context();
    
    k.setBackground(k.Color.fromHex("424050"));
    // FUNTION TO PASS THROUGHT FIGTH
    function changeFight(nextScene) {
        k.go(nextScene); // Cambia directamente a la escena de la pelea
    }    

    // FUNTION TO PASS THROUGHT SCENES 
    function changeScene(nextScene, newLevel, newPosition) {
        store.set(currentLevelAtom, newLevel)
        store.set(curretPositionsPlayerAtom, newPosition)

        k.go(nextScene);
    }

    function backScene(scene, newLevel, newPosition) {

        store.set(currentLevelAtom, newLevel)
        store.set(curretPositionsPlayerAtom, newPosition)


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
    for (const layer of level01.layers) {
        if (layer.name === "positions") {
            for (const obj of layer.objects) {
                if (obj.name === "spawn_position") {
                    posLevel01["spawn_position"] = { "x": obj.x, "y": obj.y };
                }
                else if (obj.name === "level_01_from_level_02") {
                    posLevel01["level_01_from_level_02"] = { "x": obj.x, "y": obj.y };
                }
            }
        }
    }

    // LEVEL 02
    for (const layer of level02.layers) {
        if (layer.name === "positions") {
            for (const obj of layer.objects) {
                if (obj.name === "level_02_from_level_01") {
                    posLevel02["level_02_from_level_01"] = { "x": obj.x, "y": obj.y };
                }
                else if (obj.name === "level_02_from_level_03") {
                    posLevel02["level_02_from_level_03"] = { "x": obj.x, "y": obj.y };
                }
            }
        }
    }


    // LEVEL 03
    for (const layer of level03.layers) {
        if (layer.name === "colliders") {
            for (const obj of layer.objects) {
                if (obj.name === "level_03_from_level_02") {
                    posLevel03["level_03_from_level_02"] = { "x": obj.x, "y": obj.y };
                }
            }
        }
    }


    await store.set(curretPositionsPlayerAtom, allPositions.positions_level_01.spawn_position);
    await store.set(currentLevelAtom, "level_01");


    console.log("value of the level from global state: ", store.get(currentLevelAtom));
    console.log("value of the current position from globla state: ", store.get(curretPositionsPlayerAtom));


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


        //console.log("character uploaded succesfully");


        await k.loadSprite("level-01", "/assets/map_01_ciber_heroes.png")
        //console.log("level 01 uploaded succesfully");


        await k.loadSprite("level-02", "/assets/level_02_ciber_heroes.png")
        //console.log("level 02 uploaded succesfully");


        await k.loadSprite("level-03", "/assets/level_03_ciber_heroes.png")
        //console.log("level o3 uploaded successfully");


        await k.loadFont("monogram", "../assets/monogram.ttf")

        await k.loadSprite("monster", "/assets/Idle_monster.png", {
            sliceX: 4,
            sliceY: 0,
            anims: {
                "idle": {from: 0, to: 3, loop: true}
            }
        });


        await k.loadSprite("background_level_02", "assets/background_level_02.png");

    } catch (error) {
        console.log("Error uploading sprites and assets: ", error);
    }

    //console.log("all positions: ",allPositions);

    //console.log("validate scene 01: ", k.getSprite("level-01"));


    // DEFINING THE SCENES OF THE GAME
    k.scene("scene01", () => {
        scene01(
            k,
            () => { changeScene("scene02", "level_02", allPositions.positions_level_02.level_02_from_level_01) },
            level01,
            allPositions,
            () => { changeFight("fight_01_level_02") } // Corrige el nombre aquí
        );
    });
    
    
    // Define la escena de la pelea
    k.scene("fightOne", () => {
        console.log("Fight 01 loaded");
        figthOne(k)
    });
    

    k.scene("fight_01_level_02", ()=>{
        fight02(k);
    })


    k.scene("scene03", () => {
        scene03(
            k,
            () => { changeScene("scene02", "level_02", allPositions.positions_level_02.level_02_from_level_03) },
            level03, allPositions);
    })


    k.scene("scene02", () => {
        scene02(
            k,
            () => { changeScene("scene03", "level_03", allPositions.positions_level_03.level_03_from_level_02) },
            () => { backScene("scene01", "level_01", allPositions.positions_level_01.level_01_from_level_02) },
            level02, allPositions,
            ()=>{changeFight("fight_01_level_02")});
    })

    k.scene("fight02", () => {
        fight02(k);
    })



    k.go("scene01")

    
}