/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'], // Agregar la fuente pixel art
      },
      animation: {
        float: "float 3s ease-in-out infinite", // Nombre de la animación
        bounce: "bounce 1s infinite", // Cambia la duración a 2 segundos
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(-5px)" }, // Mueve hacia arriba
          "50%": { transform: "translateY(5px)" }, // Mueve hacia abajo
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)", // Ajusta la altura del rebote
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)", // Movimiento rápido al final
          },
          "50%": {
            transform: "translateY(0)", // Posición base
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)", // Movimiento suave al inicio
          },
        },
      },
    },
  },
  plugins: [],
};
