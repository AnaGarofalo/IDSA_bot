async function chatRequest(question) {
  try {
    const response = await fetch(
      // En la IP va la del host, en donde esta levantando el contenedor de ollama (Buscar en configuracion de red)
      "http://ollama:11434/api/generate",
      {
        method: "POST",
        body: JSON.stringify({
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
        }),
      }
    );

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { chatRequest };
