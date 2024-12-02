
import { store, playerIsOnDialogue } from "../service/store";

export default async function Notification(k, player, position, textDescription, typeNotification, action){
   

    const canvasWidth = k.width();
    const canvasHeight = k.height();

    store.set(playerIsOnDialogue, true);
    
    //k.vec2(player.pos.x, player.pos.y + 100
    const notification = k.make([
        k.rect(450, 360, { radius: 8 }),
        k.area(),
        k.pos(position),
        k.anchor("center"),
        k.outline(6),
        "notification"
    ])


    const explosion = k.make([
        k.sprite("explosion_01"),
        k.area({
            shape: new k.Rect(k.vec2(0), 20, 20)
        }),
        k.pos(position),
        k.anchor("center"),
        k.scale(15),
        {anim: "explosion"}
    ])



    if(typeNotification === "block"){
        
        notification.color = k.Color.fromHex("ed0f41")

    }else if(typeNotification === "success" ){
        
        
        k.add(explosion)
        explosion.play("explosion");

        notification.color = k.Color.fromHex("93cd11")

    }else if(typeNotification === "intro"){
        notification.color = k.Color.fromHex("e225d1");
    
    }else if(typeNotification === "win"){
        notification.color = k.Color.fromHex("312c31");

        k.add(explosion)
        explosion.play("explosion");

    }else if (typeNotification === "lose"){
        notification.color = k.Color.fromHex("ff1873");
    }

    


    notification.add([
        k.text(`${textDescription}`, {
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
        k.pos(0, + 100), // Posición ajustada
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
    

    k.add(notification);
    //k.destroy(explosion);
    

    closeButton.onClick(()=>{

        store.set(playerIsOnDialogue, false);
        k.destroy(notification);
        action();
    })

}