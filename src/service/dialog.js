export default async function dialog(k,
    text = "example text",
    position = k.vec2(200, 200),
    f = () => k.debug.log("hello")
) {


    const dialogContainer = await k.add([
        k.rect(450, 460, { radius: 8 }),
        k.pos(position),
        k.area(),
        k.anchor("center"),
        k.outline(2),
        k.color(255, 255, 255),
        "dialog"
    ])

    const buttons = dialogContainer.add([
        k.rect(80, 30, { radius: 10 }),
        k.pos(dialogContainer.area.offset.x + 150, dialogContainer.area.offset.y + 200),
        k.area(),
        k.anchor("center"),
        k.outline(1),
        k.color(200, 200, 200),
        "close-btn"
    ]);


    console.log("area of the dialog: ", dialogContainer.area.offset);

    

    //buttons.pos(dialogContainer.pos.x, dialogContainer.pos.y)


    dialogContainer.add([
        k.text(text, {
            size: 34,
            width: dialogContainer.width,
            align: "center"
        }),
        k.anchor("center"),
        k.area(),
        k.color(0, 0, 0)
    ])

    dialogContainer.onClick(f);
    buttons.onClick(() => {

        k.destroy(dialogContainer);

    })

    return dialogContainer;
}