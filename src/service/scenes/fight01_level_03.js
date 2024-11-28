export default async function fightOneLevelThree(k, goBackScene){
    
    // k.add([
    //     k.text("fight 01 level 3"),
    //     k.pos(100, 100)
    // ])

    const canvasWidth = k.width();
    const canvasHeight = k.height();

    const map = k.add([
        k.sprite("background_figthTwo"),
        k.pos(0, -180),
        k.scale(1.7, 1),
    ])

    k.add([
        k.rect(canvasWidth, 200),
        k.pos(0, canvasHeight - 50),
        k.area(),
        k.body({isStatic: true}),
        k.color(k.Color.fromHex(("#091119")))
    ]);
    

    const boss01 = k.add([
        k.sprite("first_boss_level_03"),
        k.pos(100, canvasHeight - 50),
        k.body(),
        k.area({shape: new k.Rect(k.vec2(0), 25, 40)}),
        k.anchor("center"),
        k.scale(4),
        {anim: "idle"}
    ])

    let player = k.add([
        k.sprite("character"),
        { anim: "idle" },
        k.area({
            shape: new k.Rect(new k.vec2(0), 18, 18)
        }),
        k.body(),
        k.anchor("center"),
        k.pos(canvasWidth - 100, canvasHeight - 50),
        k.scale(4),
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


    boss01.play("idle");
    player.play("idle");

    


    k.onKeyPress("u", () =>{
        goBackScene()
    })
}