export default async function fightThreeLevelThree(k, goBackScene){
    // k.add([
    //     k.text("fight 03 level 3"),
    //     k.pos(100, 100)
    // ])


    const map = k.add([
        k.sprite("background_figthTwo"),
        k.pos(0),
        k.scale(2)
    ])

    const boss03 = k.add([
        k.sprite("third_boss_level_03"),
        k.pos(100, 100),
        k.body(),
        k.area(),
        k.anchor("center"),
        {anim: "idle"}
    ])

    boss03.play("idle");

    k.onKeyPress("u", () =>{
        goBackScene()
    })
}