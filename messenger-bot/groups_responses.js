const EasyDocx = require("node-easy-docx");
//docker cp ../docs/Horarios.docx messenger-bot:messenger-bot/Horarios.docx
async function groups_responses(ctx, message) {
  const keyWords = ["link", "hora", "empieza"];
  if (keyWords.every((word) => !message.includes(word))) return;

  try {
    const easyDocx = await (
      await new EasyDocx({
        path: "Horarios.docx",
      })
    ).parseDocx();
    for (const obj of easyDocx) {
      console.log(obj.items ? obj.items[0] : obj.text);
    }
    console.log(easyDocx);
  } catch (error) {
    console.log(error.message);
  }

  return "me pediste los horarios?";
  return ctx.chat.title;
}

module.exports = { groups_responses };
