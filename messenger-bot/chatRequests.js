const axios=require("axios")

async function chatRequest(question) {
  try {
    console.log(question)
    const response = await axios.post(
      // En la IP va la del host, en donde esta levantando el contenedor de ollama (Buscar en configuracion de red)
      "http://ollama:11434/api/generate",
        {
          model: "IDSAmodel",
          prompt: question,
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
    console.log(data);
    return data.response
  } catch (error) {
    console.log(error);
  }
}

module.exports = { chatRequest };
