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
    console.log(" - hbt1 - ")

   
  } catch (error) {
  console.log(error.message)
  }
  setTimeout(checkConnection, 120000)
}
async function checkConnection2() {
  try {
    const response2 = await axios.post(
      // En la IP va la del host, en donde esta levantando el contenedor de ollama (Buscar en configuracion de red)
      "http://ollama2:11434/api/generate",
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


    console.log(" - hbt2 - ")
  } catch (error) {
  console.log(error.message)
  }
  setTimeout(checkConnection2, 120000)
}



// const questions = ["Quién es Ana Garófalo?","Quién es Ignacio Urteaga?", "quién es Hernán Trejo?","Quién es Javier Ona?","Quién es el Quijote?","Cuál es el horario de la introducción conceptual?","Quién dicta la introducción a R turno impar?","Quién dicta la introducción a Python?","Donde encuentro las grabaciones de las clases teóricas del curso circular python correspondiente a la diplomatura en machine learning con Python?","Cual es el horario del curso circular complementario?","A que diplomatura le toca el curso circular complementario?","Quién es Poponio Heredia?","Si comencé la diplomatura en Machine Learning con Python el 20/01/2023 hasta cuando estoy regular?","Cómo se aprueban los cursos?","Cuándo se pide la primera reincorporación?","Cuanto tiempo tengo desde mi inscripción para pedir la primera reincorporación en la diplomatura en ciencia de datos con R y Python?","Cuál es el costo de la primera reincorporación?","Cuál es el costo de la segunda reincorporación?","Donde encuentro el acceso a las clases de bases de datos dentro del curso de nivelación positiva?","Cuanto duran las clases del curso de Programación lógica?","Cuantas semanas dura el curso de programación lógica?","Quién es Francisco Ona?"]
const questions = ["¿Cuál es el horario de Programación lógica?","¿Cuál es el link al aula virtual de Programación lógica?", "a qué hora son las clases de bases de datos?","¿Cuál es el link al dropbox de Programación lógica?","¿a qué hora son las clases de probabilidad y estadística?","Cuál es el horario de la introducción conceptual?","A qué horario son las clases de introducción a R turno impar?","Cuál es el horario de introducción a Python?","Donde encuentro las grabaciones de las clases teóricas del curso circular python correspondiente a la diplomatura en machine learning con Python?","Cual es el horario del curso circular complementario?","A que diplomatura le toca el curso circular complementario?","Cuál es el zoom al dropbox de introducción conceptual?","Si comencé la diplomatura en Machine Learning con Python el 20/01/2023 hasta cuando estoy regular?","Cómo se aprueban los cursos?","Cuándo se pide la primera reincorporación?","Cuanto tiempo tengo desde mi inscripción para pedir la primera reincorporación en la diplomatura en ciencia de datos con R y Python?","Cuál es el costo de la primera reincorporación?","Cuál es el costo de la segunda reincorporación?","Donde encuentro el acceso a las clases de bases de datos dentro del curso de nivelación positiva?","Cuanto duran las clases del curso de Programación lógica?","Cuantas semanas dura el curso de programación lógica?","Quién es Francisco Ona?"]

async function test(){
    for (const question of questions){
        console.log()
        console.log(question)
        const response = await chatRequest(question)
        console.log("Response:", response.response)
        console.log("Error:", response.error)
        console.log("Response time:", response.total_duration/1000000000)
        console.log("Words:", response.response?response.response.split(" ").length:0)
        console.log("Seconds / words:", response.total_duration?response.total_duration/response.response.split(" ").length/1000000000:0)
        console.log()
    }

    
  }
  

  test().then(()=>{
  checkConnection();
  setTimeout(checkConnection2, 30000)

})

// checkConnection();