import dialogFigth from "../dialogFigth";
export default async function fightOneLevelThree(k, goBackScene, music){
    
    // k.add([
    //     k.text("fight 01 level 3"),
    //     k.pos(100, 100)
    // ])


    


    const canvasWidth = k.width();
    const canvasHeight = k.height();
    const enemiesCount = store.get(enemiesDefeated);

    function introDialogue() {
        k.play("level_01_back_boss_fight", {
            loop: true,
            volume: 0.5
        })
        

        player.isOnDialogue = true;
        console.log("the player is in dialogue? ", player.isOnDialogue);
        const resp = "c. No requiere contraseña para conectarse";
        dialogFigth(
            k,
            "¿Cuál es una señal de que una red Wi-Fi pública puede no ser segura?",
            ["a. Tiene una señal fuerte", "b. Es de un lugar popular", "c. No requiere contraseña para conectarse", "d.	Es accesible en varios dispositivos"],
            k.vec2(canvasWidth / 2, canvasHeight / 2),
            (selectedOption) => {
                console.log("Opción seleccionada:", selectedOption);
                if(selectedOption === resp){
                    k.setGravity(null)
                    goBackScene()
                }else{
                    alert("lastima sapa");
                    goBackScene();
                }
            },
            () => {
                console.log("Diálogo cerrado");
                // Lógica adicional si el diálogo se cierra sin enviar
            }
        );
         }
       

    const map = k.add([
        k.sprite("background_figthTwo"),
        k.pos(0, -320),
        k.scale(1.7, 1.5),
    ])

    
    k.add([
        k.rect(canvasWidth, 200),
        k.pos(0, canvasHeight - 50),
        k.area(),
        k.body({ isStatic: true }),
        k.color(k.Color.fromHex(("#020232")))
    ]);
    

    const boss01 = k.add([
        k.sprite("first_boss_level_03"),
        k.pos(200, canvasHeight - 50),
        k.body(),
        k.area({shape: new k.Rect(k.vec2(0), 25, 40)}),
        k.anchor("center"),
        k.scale(8),
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
        k.pos(canvasWidth - 130, canvasHeight - 50),
        k.scale(6),
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
    
    introDialogue();
}