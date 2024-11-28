
export default async function fightThreeLevelTwo(k, goBackScene){

    k.add([
        k.text("Hello world"),
        k.pos(100, 100)
    ])


    k.onKeyPress("u", ()=> {
        goBackScene();
    })
}