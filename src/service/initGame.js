import context from "./kaplayContext"
import { displayDialogue } from "../utils/utils";


export default async function initGame(canvas) {

    console.log("verificación de función initGame(canvas): ", canvas);


    const k = context(canvas)

    k.setBackground(k.Color.fromHex("424050"))


    try {

        // SPRITE FOR THE CHARACTER EXAMPLE
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
                "walk-left":{
                    from: 8,
                    to: 11,
                    loop: true,
                    speed: 5
                },
                "walk-down":{
                    from: 12,
                    to: 15,
                    loop: true,
                    speed: 5
                },
                "walk-up":{
                    from: 16,
                    to: 19 ,
                    loop: true,
                    speed: 5
                }

            }
        })

        console.log("character uploaded succesfully");
    } catch (e) {
        console.log("Error uploading character: ", e);
    }

    try {
        await k.loadSprite("map", "/assets/ciber_heroes.png");
    } catch (error) {
        console.log("Error uploading the map: ", error);
    }



    const mapData = await fetch("/assets/ciber_heroes.json").then(res => res.json())






    //k.setGravity(600);
    const SPEED = 140;

    k.scene("game", () => {


        /// map 

        const map = k.add([
            k.pos(100, 0),
            k.scale(3),
            k.sprite("map")
        ]);

        const player = k.make([
            k.sprite("character"),
            { anim: "idle" },
            k.area({
                shape: new k.Rect(new k.vec2(0), 20, 20)
            }),
            k.body(),
            k.anchor("center"),
            k.pos(),
            k.scale(2),
            {
                speed: 200,
                direction: "left",
                isOnDialogue: false,

            },
            "player"
        ]);


        console.log(mapData);


        for (const layer of mapData.layers) {

            //console.log(layer);

            


            const objects = [];

            if (layer.name === "colliders") {
                console.log("capa procesando: ", layer.name)
                for (const obj of layer.objects) {

                    console.log(`Creando objeto: ${obj.name}`)

                    objects.push(obj.name);

                    map.add([
                        k.area({ shape: new k.Rect(k.vec2(0), obj.width, obj.height) }),
                        k.body({ isStatic: true }),
                        k.pos(obj.x, obj.y),
                        obj.name
                    ])

                    if(obj.name === "chair_01" || obj.name === "chair_02" || obj.name === "computer"){
                        k.onCollide("player", obj.name, () => {
                    
                            console.log(`collision with object: ${obj.name}`)

                            
                            player.isOnDialogue = true;
            
                            displayDialogue("CUALQUIER TEXTO", () => {
                                player.isOnDialogue = false
                            });
                        })
                    }else{
                        continue
                    }

                }   

            }

            //console.log("Objetos que colisionan: ",objects);

            if (layer.name === "positions") {
                console.log("capa procesando: ", layer.name)
                for (const obj of layer.objects) {
                    if (obj.name === "player") {
                        player.pos = k.vec2(
                            (map.pos.x + obj.x + 50),
                            (map.pos.y + obj.y + 50)
                        )

                        k.add(player);


                    }
                }
            }

        }


        
        k.onUpdate(() => {
            k.camPos(player.pos.x, player.pos.y + 100);
        })
        
        
        k.onMouseDown((mouseBtn) => {
            if(mouseBtn !== "left" || player.isOnDialogue) return;
            
            const worldMousePosition = k.toWorld(k.mousePos());
            player.moveTo(worldMousePosition, player.speed);
        })
        
        k.onKeyDown("a", ()=>{
            player.move(-SPEED, 0)
            if(player.getCurAnim().name !== "walk-left"){
                //console.log("name of the current animation:", player.getCurAnim().name)
                player.play("walk-left")
            }
        })
        
        k.onKeyDown("w", () => {
            player.move(0, -SPEED)

            if(player.getCurAnim().name !== "walk-up"){
                //console.log("name of the current animation:", player.getCurAnim().name)
                player.play("walk-up")
            }
        });
        
        k.onKeyDown("s", ()=> {
            player.move(0, SPEED)

            if(player.getCurAnim().name !== "walk-down"){
                //console.log("name of the current animation:", player.getCurAnim().name)
                player.play("walk-down")
            }
        })

        k.onKeyDown("d", ()=> {
            player.move(SPEED, 0)

            if(player.getCurAnim().name !== "walk-right"){
                //console.log("name of the current animation:", player.getCurAnim().name)
                player.play("walk-right")
            }
        })
        
        const keys = ["w", "a", "s", "d"];
        
        keys.forEach(key => {
            k.onKeyRelease(key, ()=>{
                if(!k.isKeyDown("w") || !k.isKeyDown("a") || k.isKeyDown("s") || k.isKeyDown("d")){
                    player.play("idle");
                }
            })
        });
        
        // ANIMATIONS AND LOGIC FOR TRIGGER IT 
        player.play("idle");
    
        
    })


    k.go("game");

}