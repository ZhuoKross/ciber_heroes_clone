
import { store, playerIsOnDialogue, formDialogue } from "../service/store";

export default async function Notification(k, position, textDescription, typeNotification, action){
   

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


    const text = notification.add([
        k.text(`${textDescription}`, {
            size: 40, // Tamaño del texto
            width: notification.width, // Limitar ancho
            align: "center",
            font: "monogram",
            lineSpacing: 8
        }),
        k.pos(0, -20),
        k.anchor("center"),
    ])


     // Botón "Cerrar"
     const closeButton = notification.add([
        k.rect(200, 40, { radius: 10 }),
        k.pos(0, 110), // Posición ajustadass
        k.area(),
        k.opacity(1),
        k.anchor("center"),
        k.color(255, 255, 255), // Blanco
        "close-btn",
    ]);

    const textCloseBtn = closeButton.add([
        k.text("Cerrar", { size: 18, align: "center" }),
        k.anchor("center"),
        k.color(0, 0, 0), // Texto blanco
    ]);
    

    k.add(notification);


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
    
    }else if( typeNotification === "form"){

        notification.color = k.Color.fromHex("323d49");

        k.destroy(closeButton)

        notification.width = 700;
        notification.height = 600;



        text.width = notification.width;
        text.textSize = 30;        

        

        const formButton = notification.add([
            k.rect(260, 70, { radius: 10 }),
            k.pos(0, 200),
            k.area(),
            k.anchor("center"),
            "goToForm"
        ]);

        formButton.color = k.Color.fromHex("#FFC300");


        formButton.add([
            k.text("Ir al formulario", {
                font: "monogram",
                align: "center",
                size: 40
            }),
            k.anchor("center"),
            k.color(0,0,0)
        ]);



        formButton.onClick(()=> {
            
            store.set(formDialogue, true);

            action();

            k.destroy(notification);

        })

    }

    


    
    //k.destroy(explosion);
    

    closeButton.onClick(()=>{

        store.set(playerIsOnDialogue, false);
        k.destroy(notification);
        action();
    })

}