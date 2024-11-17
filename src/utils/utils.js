export const displayDialogue = async (text, onDialogueEnd) => {
    const dialogueContainer =  document.querySelector(".dialogue-container");
    const descriptionDialogue =   document.querySelector(".description") ;
    const btnClose = document.querySelector(".btn-close");


    console.log("Dialogue container: ", dialogueContainer);
    console.log("Description Dialogue: ", descriptionDialogue);

    dialogueContainer.style.display = "block";

    let index = 0;
    let currentText = "";

    const intervalText = setInterval(()=>{

        if(index < text.length){
            currentText += text[index];
            descriptionDialogue.innerHTML = currentText;
            index++;
            return;
        }

        clearInterval(intervalText);

    },100)


    

    console.log("btn-close-modal: ", btnClose)

    function HandleCloseEvent (){
        
        console.log("enter in the close function")
        onDialogueEnd();
        dialogueContainer.style.display = "none";
        descriptionDialogue.innerHTML = "";
        clearInterval(intervalText);
        btnClose.removeEventListener("click", HandleCloseEvent);

    }


    btnClose.addEventListener("click", HandleCloseEvent)
} 