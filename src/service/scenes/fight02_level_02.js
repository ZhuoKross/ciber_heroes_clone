
export default async function fightTwoLevelTwo(k, goBackScene) {

    const canvasWidth = k.width();
    const canvasHeight = k.height();

    k.add([
        k.sprite("01_back_palm_orange_sunset"),
        k.pos(0)
    ]);

    k.add([
        k.sprite("02_back_palm_orange_sunset"),
        k.pos(0)
    ])

    k.add([
        k.sprite("03_back_palm_orange_sunset"),
        k.pos(0, canvasHeight)
    ])
}