export default async function dialog(k, text, position = k.vec2(200, 200), onClose, close) {
    // Contenedor del diálogo
    const dialogContainer = await k.add([
        k.rect(450, 460, { radius: 8 }),
        k.pos(position),
        k.area(),
        k.anchor("center"),
        k.outline(2),
        k.color(255, 255, 255),
        k.animate(),
        "dialog",
    ]);

    // Texto del diálogo
    dialogContainer.add([
        k.text(text, {
            size: 30, // Tamaño del texto
            width: 400, // Limitar ancho
            align: "center",
            font: "monogram"
        }),
        k.pos(0, -70), // Ajustar posición dentro del contenedor
        k.anchor("center"),
        k.color(0, 0, 0), // Color del texto en negro
    ]);
    
    

    // Botón "Cerrar"
    const closeButton = dialogContainer.add([
        k.rect(120, 40, { radius: 10 }),
        k.pos(-50, 150), // Posición ajustada
        k.area(),
        k.opacity(1),
        k.anchor("center"),
        k.color(200, 50, 50), // Rojo
        "close-btn",
    ]);

    closeButton.add([
        k.text("Cerrar", { size: 18, align: "center" }),
        k.anchor("center"),
        k.color(0, 0, 0), // Texto blanco
    ]);

    closeButton.onClick( async () => {
        k.destroy(dialogContainer); // Cierra el diálogo
        onClose(); // Llama a la función de cierre
    });

    // Botón "Siguiente"
    const nextButton = dialogContainer.add([
        k.rect(120, 40, { radius: 10 }),
        k.pos(100, 150), // Posición ajustada
        k.area(),
        k.anchor("center"),
        k.color(50, 200, 50), // Verde
        "next-btn",
    ]);

    nextButton.add([
        k.text("Siguiente", { size: 18, align: "center" }),
        k.anchor("center"),
        k.color(0, 0, 0), // Texto blanco
    ]);

    nextButton.onClick(() => {
        k.destroy(dialogContainer);
        close(); // Cierra el diálogo
    });

    return dialogContainer;
}
