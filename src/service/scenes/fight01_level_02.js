import dialogFigth from "../dialogFigth";
import { store, enemiesDefeated, playerIsOnDialogue } from "../store";
import Notification from "../../utils/notification";
import { GoogleGenerativeAI } from "@google/generative-ai";




export default async function fight02(k, goBackScene){
    const background = k.add ([
        k.sprite("background_level_02"),
        k.scale(1, 0.9),
        k.pos(0)
    ])

    const canvasWidth = k.width();
    const canvasHeight = k.height();
    const enemiesCount = store.get(enemiesDefeated);
     
    // Inicializar Gemini con tu API key
     const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

     // Función para procesar y limpiar la respuesta
     function cleanAndFilterResponse(text) {
        // Eliminar el prompt si está presente
        const cleanText = text.replace(/^.?Reformula.?:\s*"/i, '').replace(/"$/, '').trim();
        
        // Dividir en líneas y limpiar
        const lines = cleanText.split(/[\n.!?]+/)
            .map(line => line.trim())
            .filter(line => line.length > 0);
        
        // Seleccionar la versión más corta y clara
        const processedLines = lines.filter(line => 
            line.length >= 10 && 
            line.length <= 50 && 
            line.split(' ').length >= 3 &&
            line.split(' ').length <= 10
        );

        // Devolver la primera línea válida o la línea original si no hay coincidencias
        return processedLines.length > 0 
            ? processedLines[0] + '?' 
            : cleanText.split(/[\n.!?]+/)[0] + '?';
    }

    // Función de transformación de preguntas con Gemini
    async function transformQuestionWithGemini(originalQuestion) {
        try {
            const model = genAI.getGenerativeModel({ 
                model: "gemini-pro",
                generationConfig: {
                    maxOutputTokens: 40,  // Limitar la longitud de salida
                    temperature: 0.7,     // Añadir algo de creatividad
                }
            });
            
            const prompt = `Reformula esta pregunta sobre ciberseguridad de manera concisa: "${originalQuestion}"`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text();

            // Limpiar y procesar la respuesta
            const transformedQuestion = cleanAndFilterResponse(text);

            return transformedQuestion || originalQuestion;
        } catch (error) {
            console.error("Error en transformación de Gemini:", error);
            return originalQuestion;
        }
    }
    
    
    async function introDialogue() {

        store.set(playerIsOnDialogue, true);

        console.log("the player is in dialogue? ", store.get(playerIsOnDialogue));

        const resp = "a. Un correo que pide información personal urgente";
        const originalQuestion = "¿Cuál de los siguientes correos es más probable que sea falso o malicioso?";

        const transformedQuestion = await transformQuestionWithGemini(originalQuestion)
        
        dialogFigth(
            k,
            transformedQuestion,
            ["a. Un correo que pide información personal urgente", "b. Un correo de un amigo", "c. Un correo de bienvenida a un servicio al que te suscribiste", "d. Un correo con consejos para mejorar la seguridad"],
            k.vec2(canvasWidth / 2, canvasHeight / 2),
            (selectedOption) => {
                console.log("Opción seleccionada:", selectedOption);
                if(selectedOption === resp){
                    Notification(
                        k,
                        player,
                        k.vec2(canvasWidth / 2, canvasHeight / 2),
                        "¡Muy Bien! Has respondido Correctamente",
                        "win",
                        () => { goBackScene(); }
                    );


                    store.set(enemiesDefeated, [...enemiesCount, 1])
                    
                    
                    
                }else{
                    Notification(
                        k,
                        player,
                        k.vec2(canvasWidth / 2, canvasHeight / 2),
                        "Respuesta Incorrecta, Sigue intentando!",
                        "lose",
                        () => { goBackScene(); }
                    );
                }
            },
            () => {
                console.log("Diálogo cerrado");
                // Lógica adicional si el diálogo se cierra sin enviar
            }
        );
         }

    k.add([
        k.rect(canvasWidth, 200),
        k.pos(0, canvasHeight - 50),
        k.area(),
        k.body({isStatic: true}),
        k.color(k.Color.fromHex(("#2e4053")))
    ])


    const monster = k.add([
        k.sprite("monster"),
        k.pos(200, canvasHeight - 200),
        k.area({
            shape: new k.Rect(k.vec2(0), 30, 40)
        }),
        k.body(),
        {anim: "idle"},
        k.anchor("center"),
        k.scale(6)
    ])


    const player = k.make([
        k.sprite("character"),
        { anim: "idle" },
        k.area({
            shape: new k.Rect(new k.vec2(0), 26, 26)
        }),
        k.body(),
        k.anchor("center"),
        k.pos(canvasWidth - 100, canvasHeight - 100),
        k.scale(9),
        {
            speed: 200,
            direction: "left",
            currentPosition: {},
            currentLevel: "",
        },
        "player"
    ])


    


    monster.play("idle");
    player.play("idle");

    k.add(player);


         introDialogue();
}