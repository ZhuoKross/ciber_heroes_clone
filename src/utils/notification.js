import { store, playerIsOnDialogue } from "../service/store";

export default function Notification(k, player){
   

    const canvasWidth = k.width();
    const canvasHeight = k.height();

    store.set(playerIsOnDialogue, true);
    
    const notification = k.add([
        k.rect(450, 360, { radius: 8 }),
        k.area(),
        k.pos(k.vec2(player.pos.x, player.pos.y + 100)),
        k.anchor("center"),
        k.outline(5),
        k.color(k.Color.fromHex("ed0f41")),
        "notification"
    ])


    notification.add([
        k.text("No Puedes Pasar al Siguiente Nivel, Aún te quedan enemigos por derrotar :/", {
            size: 40, // Tamaño del texto
            width: notification.width, // Limitar ancho
            align: "center",
            font: "monogram"
        }),
        k.pos(0, -20),
        k.anchor("center"),
    ])


     // Botón "Cerrar"
     const closeButton = notification.add([
        k.rect(220, 40, { radius: 10 }),
        k.pos(0, + 90), // Posición ajustada
        k.area(),
        k.opacity(1),
        k.anchor("center"),
        k.color(255, 255, 255), // Blanco
        "close-btn",
    ]);

    closeButton.add([
        k.text("Cerrar", { size: 18, align: "center" }),
        k.anchor("center"),
        k.color(0, 0, 0), // Texto blanco
    ]);
    

    closeButton.onClick(()=>{
        k.destroy(notification);

        store.set(playerIsOnDialogue, false);
    })

}