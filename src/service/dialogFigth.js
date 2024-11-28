export default async function dialogFigth(k, text, options = [], position = k.vec2(200, 200), onSubmit, onClose) {
    // Contenedor del diálogo
    const dialogContainer = await k.add([
        k.rect(450, 500, { radius: 8 }),
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
            font: "monogram",
        }),
        k.pos(0, -180), // Ajustar posición dentro del contenedor
        k.anchor("center"),
        k.color(0, 0, 0), // Color del texto en negro
    ]);

    // Opciones del selector
    let selectedOption = null;

    options.forEach((option, index) => {
        const optionButton = dialogContainer.add([
            k.rect(400, 40, { radius: 5 }),
            k.pos(0, -100 + index * 50), // Posición vertical según el índice
            k.area(),
            k.anchor("center"),
            k.color(200, 200, 200), // Color inicial
            "option-btn",
        ]);

        optionButton.add([
            k.text(option, { size: 20, align: "left" }),
            k.pos(-180, 0), // Ajuste de posición del texto
            k.anchor("left"),
            k.color(0, 0, 0), // Texto negro
        ]);

        optionButton.onClick(() => {
            // Actualizar la selección
            selectedOption = option;

            // Cambiar el color para indicar selección
            dialogContainer.getChildren().forEach((child) => {
                if (child.is("option-btn")) {
                    child.color = k.color(200, 200, 200); // Restablecer color
                }
            });
            optionButton.color = k.color(100, 200, 100); // Verde claro para selección
        });
    });

    // Botón "Enviar"
    const submitButton = dialogContainer.add([
        k.rect(120, 40, { radius: 10 }),
        k.pos(-100, 180), // Posición ajustada
        k.area(),
        k.anchor("center"),
        k.color(50, 200, 50), // Verde
        "submit-btn",
    ]);

    submitButton.add([
        k.text("Enviar", { size: 18, align: "center" }),
        k.anchor("center"),
        k.color(0, 0, 0), // Texto negro
    ]);

    submitButton.onClick(() => {
        if (selectedOption) {
            k.destroy(dialogContainer); // Cierra el diálogo
            onSubmit(selectedOption); // Enviar la respuesta seleccionada
        } else {
            console.warn("No se seleccionó ninguna opción");
        }
    });

    // Botón "Cerrar"
    const closeButton = dialogContainer.add([
        k.rect(120, 40, { radius: 10 }),
        k.pos(100, 180), // Posición ajustada
        k.area(),
        k.anchor("center"),
        k.color(200, 50, 50), // Rojo
        "close-btn",
    ]);

    closeButton.add([
        k.text("Cerrar", { size: 18, align: "center" }),
        k.anchor("center"),
        k.color(0, 0, 0), // Texto negro
    ]);

    closeButton.onClick(() => {
        k.destroy(dialogContainer); // Cierra el diálogo
        onClose(); // Llama a la función de cierre
    });

    return dialogContainer;
}
