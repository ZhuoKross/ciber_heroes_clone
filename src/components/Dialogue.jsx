import React from "react";

export default function Dialogue({ title, description, onSubmit, onClose }) {
    return (
        <div className="dialogue-container absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="flex flex-col justify-start items-start p-4 bg-white shadow-lg rounded-lg">
                <h3 >{title}</h3>
                <div >{description}</div>
                <div className="buttons mt-4 flex space-x-2">
                    <button onClick={onSubmit}>
                        Enviar
                    </button>
                    <button  onClick={onClose}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
