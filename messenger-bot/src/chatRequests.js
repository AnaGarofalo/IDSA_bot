const axios=require("axios")

async function chatRequest(question) {
  try {
    const response = await axios.post(
      // En la IP va la del host, en donde esta levantando el contenedor de ollama (Buscar en configuracion de red)
      "http://ollama:11434/api/generate",
        {
          model: "IDSAmodel",
          prompt: question+" Respondé de manera concisa",
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
    return data
  } catch (error) {
    return {error:error.message}
  }
}

module.exports = { chatRequest };
