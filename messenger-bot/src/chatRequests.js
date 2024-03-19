const axios=require("axios")

async function chatRequest(question) {
  let url = "http://ollama2:11434/api/generate"
  if (question.toLowerCase().includes("quién") || question.toLowerCase().includes("quien")  || question.toLowerCase().includes("docente")){
    url = "http://ollama:11434/api/generate"
  }
  console.log("url", url)
  try {
    const response = await axios.post(
      // En la IP va la del host, en donde esta levantando el contenedor de ollama (Buscar en configuracion de red)
      url,
        {
          model: "IDSAmodel",
          prompt: question+" Respondé de manera corta y precisa",
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
