import dialog from "../dialog";

export default async function fight02(k, goBackScene){
    const background = k.add ([
        k.sprite("background_level_02"),
        k.scale(1, 0.9),
        k.pos(-150, 0)
    ])

    const canvasWidth = k.width();
    const canvasHeight = k.height();

    k.add([
        k.rect(canvasWidth, 200),
        k.pos(0, canvasHeight - 50),
        k.area(),
        k.body({isStatic: true}),
        k.color(k.Color.fromHex(("#2e4053")))
    ])


    const monster = k.add([
        k.sprite("monster"),
        k.pos(180, + 550),
        k.area({
            shape: new k.Rect(k.vec2(0), 30, 40)
        }),
        k.body(),
        {anim: "idle"},
        k.anchor("center"),
        k.scale(3)
    ])


    const player = k.make([
        k.sprite("character"),
        { anim: "idle" },
        k.area({
            shape: new k.Rect(new k.vec2(0), 26, 26)
        }),
        k.body(),
        k.anchor("center"),
        k.pos(900, + 550),
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


    const gravity = 200;

    k.setGravity(gravity);


    monster.play("idle");
    player.play("idle");

    k.add(player);


    dialog(k, "EXAMPLE BITCH", k.vec2(canvasWidth / 2, canvasHeight / 2), ()=> {k.debug.log("closing dialogue")});

    k.onKeyPress("u", ()=>{
        k.setGravity(null);
        goBackScene();
    })

}