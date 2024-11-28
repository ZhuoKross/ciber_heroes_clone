export default async function fightTwoLevelThree(k, goBackScene){
    // k.add([
    //     k.text("fight 02 level 3"),
    //     k.pos(100, 100)
    // ])


    const boss02 = k.add([
        k.sprite("second_boss_level_03"),
        k.pos(100, 100),
        k.body(),
        k.area(),
        k.anchor("center"),
        k.scale(4),
        {anim: "idle"}
    ])

    boss02.play("idle");

    k.onKeyPress("u", () =>{
        goBackScene()
    })
}