import React, { useState } from "react";

export default function Dialogue({ title, description, options = [], onClose, onSubmit }) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionChange = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((o) => o !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleSubmit = () => {
        const isCorrect = selectedOptions.includes(
            "tipo de ciberataque que engaña a las personas y hacer que compartan datos confidenciales"
        );

        if (isCorrect) {
            alert("¡Felicidades! Respuesta correcta.");
        } else {
            alert("Respuesta incorrecta, intenta nuevamente.");
        }

        onSubmit(selectedOptions); // Envía las respuestas seleccionadas al callback
        onClose(); // Cierra el diálogo
    };

    return (
        <div className="dialogue-container absolute hidden">
            <div className="flex flex-col justify-start items-start">
                <h3 className="title text-black">{title}</h3>
                <div className="description text-black">{description}</div>
                <div className="options">
                    {options.map((option, index) => (
                        <label key={index} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={option}
                                onChange={() => handleOptionChange(option)}
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
                <div className="buttons mt-4">
                    <button className="btn-submit" onClick={handleSubmit}>
                        Enviar
                    </button>
                    <button className="btn-close" onClick={onClose}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
