export default async function figthThree(k) {
    const player = k.make([
        k.sprite("character"),
        { anim: "idle" },
        k.area({
            shape: new k.Rect(new k.vec2(0), 18, 18)
        }),
        k.body(),
        k.anchor("center"),
        k.pos(100, 650),
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
    k.add(player);

     

    k.add([
        k.rect(9000, 250),
        k.area(),
        k.outline(2),
        k.pos(0, 700),
        k.body({ isStatic: true }),
    ]); 
    
}