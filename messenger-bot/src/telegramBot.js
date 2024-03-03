const TelegramBot = require("node-telegram-bot-api");
const { chatRequest } = require("./chatRequests");
require("dotenv").config()

const {DEV_ID} = process.env

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

      if (!message) return;
      console.log()
      console.log("-------- New Message -------")
      console.log("Id: ", ctx.chat.id)
      console.log(ctx.chat.type === "private"? "From: "+ctx.chat.first_name+" "+ctx.chat.last_name:"From group: "+ctx.chat.title)
      console.log("Message:", message)

      let response;
      
      if(ctx.chat.type === "private") response = await chatRequest(message)
      else if (!keyWords.every((word) => !message.includes(word))) response = await chatRequest(message)

      if (!response) return      
      else if(response.response){ 
        const response_time = response.total_duration/1000000000
        telegramBot.sendMessage(sessionId, response.response)
        console.log("Response time:", response_time)
        console.log("Words:", response.response.split(" ").length)
        console.log("Time / Words:", response_time/response.response.split(" ").length)
        console.log("Response:", response.response);
      } else if (response.error){ 
        telegramBot.sendMessage(DEV_ID, response.error)
        console.log("Error:", response.error);
      };
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
