const { initTelegramBot } = require("./telegramBot");
const axios=require("axios")

// initWhatsappBot();
initTelegramBot();

async function checkConnection() {
    try {
      const response = await axios.post(
        // En la IP va la del host, en donde esta levantando el contenedor de ollama (Buscar en configuracion de red)
        "http://ollama:11434/api/generate",
          {
            model: "IDSAmodel",
            prompt: "Hola, me dirías de manera concisa cuánto es 2 + 2?",
            stream: false,
            // stream: true,
            // messages: [
            //     {
            //         role: 'user',
            //         content: message,
            //     },
            // ],
          }
      );
  
      const data = response.data;
      console.log(" - hbt - ")
    } catch (error) {
    console.log(error.message)
    }
    setTimeout(checkConnection, 120000)
  }

checkConnection();
