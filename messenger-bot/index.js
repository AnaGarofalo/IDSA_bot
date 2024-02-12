const { initTelegramBot } = require("./telegramBot");
const { initWhatsappBot } = require("./whatsappBot");

initWhatsappBot();
initTelegramBot();

// async function checkConnection() {
//   const response = await fetch("http://ollama:11434", {
//     method: "GET",
//   });
//   console.log(response);
// }

// checkConnection();
