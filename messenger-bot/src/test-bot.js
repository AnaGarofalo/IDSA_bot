const { chatRequest } = require("./chatRequests")

const questions = ["Quién es Ana Garófalo?","Quién es Ignacio Urteaga?", "quién es Hernán Trejo?","Quién es Javier Ona?","Quién es el Quijote?","Cuál el horario de la introducción conceptual turno par? mal, es Lunes 21:30 hs","Quién dicta la introducción a R turno impar?","Quién dicta la introducción a Python?","Donde encuentro las grabaciones de las clases teóricas del curso circular python correspondiente a la diplomatura en machine learning con Python?","Cual es el horario del curso circular complementario?","A que diplomatura le toca el curso circular complementario?","Quién es Poponio Heredia?","Si comencé la diplomatura en Machine Learning con Python el 20/01/2023 hasta cuando estoy regular?","Cómo se aprueban los cursos?","Cuándo se pide la primera reincorporación?","Cuanto tiempo tengo desde mi inscripción para pedir la primera reincorporación en la diplomatura en ciencia de datos con R y Python?","Cuál es el costo de la primera reincorporación?","Cuál es el costo de la segunda reincorporación?","Donde encuentro el acceso a las clases de bases de datos dentro del curso de nivelación positiva?","Cuanto duran las clases del curso de Programación lógica?","Cuantas semanas dura el curso de programación lógica?","Quién es Francisco Ona?"]

async function test(){
    for (const question of questions){
        console.log()
        console.log(question)
        const response = await chatRequest(question)
        console.log("Response:", response.response)
        console.log("Response time:", response.total_duration/1000000000)
        console.log("Words:", response.response.split(" ").length)
        console.log("Seconds / words:", response.total_duration/response.response.split(" ").length/1000000000)
        console.log()
    }

}

test()