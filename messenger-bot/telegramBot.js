const TelegramBot = require("node-telegram-bot-api");
const { chatRequest } = require("./chatRequests");

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
      const message = ctx.text.toLowerCase().trim();
      const sessionId = ctx.chat.id;

      if (!message) return;

      const response = await chatRequest(message);
      if (!response) return;
      console.log(response);

      telegramBot.sendMessage(sessionId, response.response);
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
