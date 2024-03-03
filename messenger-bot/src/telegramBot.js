const TelegramBot = require("node-telegram-bot-api");
const { chatRequest } = require("./chatRequests");
require("dotenv").config()
const { DEV_ID } = process.env

const keyWords = ["link", "hora", "empieza"];

async function initTelegramBot() {
  // el TOKEN que se asigna al crear el bot (botfather)
  const TOKEN = "6596874745:AAGJrBCtfbgk30pcV-4qboZ7-XBVvCPY264";
  const options = {
    polling: true,
  };

  const telegramBot = new TelegramBot(TOKEN, options);

  // Determina qué función se ejecutará al recibir un mensaje del usuario
  try {
    telegramBot.on("message", async (ctx) => {
      const message = ctx.text ? ctx.text.toLowerCase().trim() : "";
      const sessionId = ctx.chat.id;

      console.log()
      console.log("------- New Message -------")
      console.log("Id:", sessionId)
      
      let response
      if (!message) return;
      if (ctx.chat.type === "private"){

        console.log("From:", ctx.chat.first_name+" "+ ctx.chat.last_name)
        response = await chatRequest(message)

      } else if (!keyWords.every(str=>!message.includes(str))){

        console.log("From:", ctx.chat.title)
        response = await chatRequest(message)

      }
      console.log("Message:", message)

      if (!response) return;
      if (response.response){

        console.log("Response:", response.response)
        console.log("Response time:", response.total_duration/1000000000)
        console.log("Words:", response.response.split(" ").length)
        console.log("Seconds / words:", response.total_duration/response.response.split(" ").length/1000000000)

        telegramBot.sendMessage(sessionId, response.response);
      } else if (response.error){
        console.log("Error:", response.error)
        telegramBot.sendMessage(DEV_ID, response.error);
      }
      console.log()

    });
  } catch (error) {
    console.log();
    console.log("********* ERROR *********");
    console.log("File: ./telegramBot.js ");
    console.log("Function: initTelegramBot()");
    console.log(error.message);
    console.log();
  }

  return telegramBot;
}

module.exports = { initTelegramBot };
