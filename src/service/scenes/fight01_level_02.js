

export default async function fight02(k){
    const monster = k.add([
        k.sprite("monster"),
        k.pos(100, 100),
        k.area(),
        k.body(),
        {anim: "idle"},
        k.scale(2)
    ])


    const player = k.make([
        k.sprite("character"),
        { anim: "idle" },
        k.area({
            shape: new k.Rect(new k.vec2(0), 18, 18)
        }),
        k.body(),
        k.anchor("center"),
        k.pos(100, 100),
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

    monster.play("idle");

    k.add(player);
}