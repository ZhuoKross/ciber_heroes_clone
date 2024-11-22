

export default function scene01(k, goToNextScene) {

    k.scene("scene01", async () => {



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
        } catch (e) {
            console.log("Error uploading character: ", e);
        }

        try {
            await k.loadSprite("map", "/assets/map_01_ciber_heroes.png");

            console.log("map uploaded succesfully");
        } catch (error) {
            console.log("Error uploading the map: ", error);
        }


        const map = k.add([
            k.sprite("map"),
            k.pos(100, 50),
            k.scale(2)
        ])

        

        await map.add([
            k.sprite("character"),
            k.area(),
            k.body(),
            k.anchor("center")
        ])

        k.drawText({
            text: "welcome",
            size: 54,
            with: 120,
            pos: k.vec2(100, 100)
        })

        //const mapData = await fetch("/assets/map_01_ciber_heroes.json").then(res => res.json())

        k.onkeyPress("u", ()=> {
            goToNextScene();
        })
    })
}