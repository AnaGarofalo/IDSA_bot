// const docx4js = require("docx4js");

async function groups_responses(ctx, message) {
  const keyWords = ["link", "hora", "empieza"];
  if (keyWords.every((word) => !message.includes(word))) return;

  //   const doc = await docx4js.load(
  //     "IDSA/docs/Horarios y docentes de los cursos.docx"
  //   );
  console.log(doc);

  return "me pediste los horarios?";
  return ctx.chat.title;
}

module.exports = { groups_responses };
