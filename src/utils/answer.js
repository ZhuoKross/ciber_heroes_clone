export const AnswerDisplayDialogue = (text, options = [], onDialogueEnd) => {
    const dialogueContainer = document.querySelector(".dialogue-container");
    const descriptionDialogue = dialogueContainer.querySelector(".description");
    const optionsContainer = dialogueContainer.querySelector(".options");
    const btnSubmit = dialogueContainer.querySelector(".btn-submit");
    const btnClose = dialogueContainer.querySelector(".btn-close");

    if (!dialogueContainer || !descriptionDialogue || !btnClose || !optionsContainer || !btnSubmit) {
        console.error("No se encontraron los elementos necesarios del diálogo en el DOM.");
        return;
    }

    dialogueContainer.style.display = "block";
    descriptionDialogue.textContent = text;

    // Renderiza las opciones como checkboxes
    optionsContainer.innerHTML = "";
    options.forEach((option) => {
        const label = document.createElement("label");
        label.classList.add("flex", "items-center", "space-x-2");
        label.innerHTML = `
            <input type="checkbox" value="${option}" />
            <span>${option}</span>
        `;
        optionsContainer.appendChild(label);
    });

    const selectedOptions = new Set();
    optionsContainer.addEventListener("change", (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            selectedOptions.add(value);
        } else {
            selectedOptions.delete(value);
        }
    });

    const closeDialogue = () => {
        dialogueContainer.style.display = "none";
        descriptionDialogue.textContent = "";
        optionsContainer.innerHTML = "";
        btnSubmit.removeEventListener("click", submitDialogue);
        btnClose.removeEventListener("click", closeDialogue);
        onDialogueEnd([...selectedOptions]);
    };

    const submitDialogue = () => {
        closeDialogue();
    };

    btnSubmit.addEventListener("click", submitDialogue);
    btnClose.addEventListener("click", closeDialogue);
};
