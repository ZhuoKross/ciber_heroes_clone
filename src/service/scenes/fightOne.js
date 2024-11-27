export default function figthOne(k) {
    // Cargar los sprites necesarios (asegúrate de que se hayan cargado previamente)
    k.loadSprite("background_test", "/assets/background_test.gif", { sliceX: 1, sliceY: 1 });
    k.loadSprite("character", "/assets/spriteSheet_character_ciber_heroes.png", {
        sliceX: 4, sliceY: 5,
        anims: { "idle": { from: 0, to: 3, loop: true, speed: 5 } }
    });
    k.loadSprite("enemies_One", "/assets/spriteSheet_enemy.png", {
        sliceX: 4, sliceY: 5,
        anims: { "idle": { from: 0, to: 3, loop: true, speed: 5 } }
    });

    // Registrar la escena
    k.scene("fightOne", () => {
        // Fondo animado
        k.add([
            k.sprite("background_test"),
            k.pos(0, 0),
            k.scale(0.88),
            "background",
        ]);

        // Plataforma
        k.add([
            k.rect(10000, 250),
            k.area(),
            k.pos(0, 700),
            k.body({ isStatic: true }),
        ]);

        // Jugador
        const player = k.add([
            k.sprite("character"),
            { anim: "idle" },
            k.area({ shape: new k.Rect(new k.vec2(0), 20, 20) }),
            k.body(),
            k.anchor("center"),
            k.pos(400, 600),
            k.scale(2),
            { speed: 200 },
        ]);

        player.play("idle");

        // Enemigos
        const enemy = k.add([
            k.sprite("enemies_One"),
            { anim: "idle" },
            k.area({ shape: new k.Rect(new k.vec2(0), 10, 10) }),
            k.body(),
            k.anchor("center"),
            k.pos(800, 600),
            k.scale(2),
        ]);

        enemy.play("idle");

        // Botón para regresar
        k.add([
            k.text("Regresar", { size: 24 }),
            k.pos(k.width() / 2, k.height() - 50),
            k.anchor("center"),
            "button",
        ]);

        k.onClick("button", () => {
            k.go("scene01");
        });
    });
}
