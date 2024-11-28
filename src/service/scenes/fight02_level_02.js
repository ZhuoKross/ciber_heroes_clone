
export default async function fightTwoLevelTwo(k, goBackScene) {

    const canvasWidth = k.width();
    const canvasHeight = k.height();


    
   
    k.add([
        k.sprite("02_back_palm_orange_sunset"),
        k.pos(0),
        k.scale(5, 4.6),
    ])

    k.add([
        k.sprite("03_back_palm_orange_sunset"),
        k.pos(0),
        k.scale(5, 4.6),
    ])

    k.add([
        k.sprite("04_back_palm_orange_sunset"),
        k.pos(0),
        k.scale(5, 4.6),
        k.area({
            shape: new k.Rect(k.vec2(0, 130 ), canvasWidth, 10)
        })
    ])


    // const monster = k.add([
    //     k.sprite("monster02_level02"),
    //     k.pos(200, 130),
    //     k.area({
    //         shape: new k.Rect(k.vec2(0), 20, 20)
    //     }),
    //     k.body(),
    //     k.anchor("center"),
    //     k.scale(4),
    //     {anim: "idle"}
    // ])


    // monster.play("idle"); 
}