// MODO DEMO: Usar valores fijos en lugar de variables de entorno
// const {
//   REACT_APP_STOP_APP_URL,
//   REACT_APP_STOP_APP_URL_BACK,
//   REACT_APP_BASENAME
// } = process.env;

const config = {
  URL: {
    STOP_APP_URL: 'http://localhost:3000', // Valor fijo para demo
    STOP_APP_URL_BACK: 'http://localhost:8000', // Valor fijo para demo
    BASENAME: process.env.NODE_ENV === 'production' ? '/sistema-turnos-frontend-demo' : '' // Basename para GitHub Pages
  },
  // Configuraciones adicionales para modo demo
  DEMO_MODE: true,
  API_TIMEOUT: 5000
};

export default config;
