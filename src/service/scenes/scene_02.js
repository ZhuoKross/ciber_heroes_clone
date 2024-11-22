export default function scene02(k, goToNextScene){
    k.scene("scene02", async ()=> {
        try{

            k.add ([
                k.text("PRUEBA DE ESCENA 2", {size: 50}),
                k.pos(100, 100),
                k.anchor("center")
            ])
    
    
            k.add([
                k.text("Presiona 'U' para volver a la escena 01"),
                k.pos(100, 130),
                k.anchor("center")
            ])
    
        }catch (e){
            throw new Error("No se pudo cargar totalmente la escena 02");
        }
    
    
        k.onKeyPress("u", ()=> {
            goToNextScene();
        });
    })

}