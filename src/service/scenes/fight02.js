

export default async function fight02(k){
    const monster = k.add([
        k.sprite("monster"),
        k.pos(100, 100),
        k.area(),
        k.body(),
        {anim: "idle"},
        k.scale(2)
    ])

    monster.play("idle");
}