const { initTelegramBot } = require("./telegramBot");
const axios=require("axios")
const { chatRequest } = require("./chatRequests")
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



const questions = ["Quién es Ana Garófalo?","Quién es Ignacio Urteaga?", "quién es Hernán Trejo?","Quién es Javier Ona?","Quién es el Quijote?","Cuál el horario de la introducción conceptual turno par?","Quién dicta la introducción a R turno impar?","Quién dicta la introducción a Python?","Donde encuentro las grabaciones de las clases teóricas del curso circular python correspondiente a la diplomatura en machine learning con Python?","Cual es el horario del curso circular complementario?","A que diplomatura le toca el curso circular complementario?","Quién es Poponio Heredia?","Si comencé la diplomatura en Machine Learning con Python el 20/01/2023 hasta cuando estoy regular?","Cómo se aprueban los cursos?","Cuándo se pide la primera reincorporación?","Cuanto tiempo tengo desde mi inscripción para pedir la primera reincorporación en la diplomatura en ciencia de datos con R y Python?","Cuál es el costo de la primera reincorporación?","Cuál es el costo de la segunda reincorporación?","Donde encuentro el acceso a las clases de bases de datos dentro del curso de nivelación positiva?","Cuanto duran las clases del curso de Programación lógica?","Cuantas semanas dura el curso de programación lógica?","Quién es Francisco Ona?"]

async function test(){
    for (const question of questions){
        console.log()
        console.log(question)
        const response = await chatRequest(question)
        console.log("Response:", response.response)
        console.log("Error:", response.error)
        console.log("Response time:", response.total_duration/1000000000)
        console.log("Words:", response.resposne?response.response.split(" ").length:0)
        console.log("Seconds / words:", response.total_duration?response.total_duration/response.response.split(" ").length/1000000000:0)
        console.log()
    }

    checkConnection();

}

test()

// checkConnection();