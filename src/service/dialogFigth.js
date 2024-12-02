import { playerIsOnDialogue, store } from "./store";

export default async function dialogFigth(k, text, options = [], position = k.vec2(200, 200), onSubmit) {
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

    // Título o texto principal del diálogo
    dialogContainer.add([
        k.text(text, {
            size: 30,
            width: 400,
            align: "center",
            font: "monogram",
        }),
        k.pos(0, -180),
        k.anchor("center"),
        k.color(0, 0, 0),
    ]);

    // Variable para guardar la opción seleccionada
    let selectedButton = null;

    // Crear botones de opciones
    const optionButtons = options.map((option, index) => {
        // Botón base
        const optionButton = dialogContainer.add([
            k.rect(400, 60, { radius: 5 }),
            k.pos(0, -100 + index * 70),
            k.area(),
            k.anchor("center"),
            k.color(200, 200, 200), // Fondo gris por defecto
            "option-btn",
        ]);

        // Texto dentro del botón
        const buttonText = optionButton.add([
            k.text(option, {
                size: 18,
                align: "left",
                width: 380,
            }),
            k.pos(-180, 0),
            k.anchor("left"),
            k.color(0, 0, 0), // Texto negro
        ]);

        // Evento de clic en el botón
        optionButton.onClick(() => {
            // Si ya se había seleccionado otro botón, restablecer su color
            if (selectedButton) {
                selectedButton.use(k.color(200, 200, 200)); // Fondo gris
            }

            // Cambiar el color del botón actual a verde
            optionButton.use(k.color(100, 200, 100)); // Fondo verde claro

            // Actualizar el botón seleccionado
            selectedButton = optionButton;
        });

        return optionButton;
    });

    // Botón "Enviar"
    const submitButton = dialogContainer.add([
        k.rect(120, 40, { radius: 10 }),
        k.pos(0, 180),
        k.area(),
        k.anchor("center"),
        k.color(50, 200, 50), // Verde
        "submit-btn",
    ]);

    submitButton.add([
        k.text("Enviar", { size: 18, align: "center" }),
        k.anchor("center"),
        k.color(0, 0, 0),
    ]);
    // Evento de clic en "Enviar"
    submitButton.onClick(() => {
        if (selectedButton) {
            store.set(playerIsOnDialogue, false);   
            const selectedOption = options[optionButtons.indexOf(selectedButton)];
            k.destroy(dialogContainer); // Cierra el diálogo
            onSubmit(selectedOption); // Enviar la respuesta seleccionada
        } else {
            console.warn("No se seleccionó ninguna opción");
        }
    });
    return dialogContainer;
}