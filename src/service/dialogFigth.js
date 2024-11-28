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

    // Lista para almacenar referencias de los botones de opciones
    const optionButtons = [];
    let selectedOption = null;

    // Crear botones para las opciones
    options.forEach((option, index) => {
        const optionButton = dialogContainer.add([
            k.rect(400, 60, { radius: 5 }), // Aumenta la altura para acomodar texto largo
            k.pos(0, -100 + index * 70), // Ajusta la posición vertical
            k.area(),
            k.anchor("center"),
            k.color(200, 200, 200), // Color inicial
            "option-btn",
        ]);
    
        optionButton.add([
            k.text(option, { 
                size: 18, // Tamaño de texto más pequeño
                align: "left", 
                width: 380, // Limita el ancho del texto para que se ajuste
            }),
            k.pos(-180, 0), // Ajuste de posición del texto dentro del botón
            k.anchor("left"),
            k.color(0, 0, 0), // Texto negro
        ]);
    
        // Agregar el evento de clic
        optionButton.onClick(() => {
            // Actualizar la opción seleccionada
            selectedOption = option;
    
            // Actualizar el color de todos los botones
            optionButtons.forEach((btn) => {
                btn.color = k.color(200, 200, 200); // Restablecer color
            });
            optionButton.color = k.color(100, 200, 100); // Verde claro para selección
        });
    
        // Almacenar referencia al botón
        optionButtons.push(optionButton);
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
 