const fs = require("fs");
const path = require("path");
const makeWASocket = require("@whiskeysockets/baileys").default;
const {
  DisconnectReason,
  useMultiFileAuthState,
} = require("@whiskeysockets/baileys");
const { chatRequest } = require("./chatRequests");

async function initWhatsappBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");

  const whatsappSocket = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    qrTimeout: 60000, // tiempo en milisegundos (2 minutos)
  });

  /* WHATSAPP Events */
  whatsappSocket.ev.on("creds.update", saveCreds);

whatsappSocket.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect, qr } = update || {};

      console.log("connection", connection);
      console.log("qr", qr);

      switch (connection) {
        case "connecting":
          /*
        - Al momento de escanear el QR...
        */
          break;
        case "close":
          /*
        - El usuario manualmente borro la sesion.
        - Se acabo el tiempo de luego de varias actualizaciones de QR (no se ha escaneado el mismo).
        */

          // console.log('state', state)
          // state.keys.clear && state.keys.clear()

          console.log("DisconnectReason.loggedOut", DisconnectReason.loggedOut);

          const shouldReconnect =
            lastDisconnect?.error?.output?.statusCode !==
            DisconnectReason.loggedOut;

          console.info(
            `❌ Conexión cerrada por: ${lastDisconnect.error}\nReconectando: ${shouldReconnect}`
          );

          // Se reconecta si es que la sesion no se ha cerrado...
          if (shouldReconnect) {
            setTimeout(() => initWhatsappBot(), 30000);
          } else {
            // delete session saved
            const fromPath = path.resolve(__dirname);
            console.log("fromPath", fromPath);

            fs.rmdir("./auth_info_baileys", (err) => {
              if (err) {
                console.error(err);
              } else {
                console.info("exito");
              }
            });

            // fs.rmdir(fromPath.concat('/auth_info_baileys'), (err) => {
            //   if (err) {
            //     console.error(err)
            //   } else {
            //     console.info('exito')
            //   }
            // })
          }

          break;
        case "open":
          /*
        - Luego de haber escaneado el QR y este ha sido exitoso.
        */
          console.info("🟢 Bot WhatsApp conectado!");


          break;
        default:
        /*
        - No existe conexion (Actualizacion de QR)
        */
        // mqttSocket.publish(
        //   'iotab/whatsapp/qr/auth',
        //   JSON.stringify({
        //     qr: qr,
        //     status: true,
        //   }),
        // )

        // console.info('📧 Se ha enviado un email con el QR!')
}});

  whatsappSocket.ev.on("messages.upsert", async (m) => {
    const messages = m.messages[0];
    const remoteJid = messages.key.remoteJid;
    const fromNumber = remoteJid.split("@")[0];
    const fromName = messages.pushName;
    const isHost = messages.key.fromMe ?? true;
    const msg = {
      text: !messages.message?.conversation
        ? messages.message?.extendedTextMessage?.text
        : messages.message?.conversation,
      isGroup: fromNumber.length > 16,
    };
    const history = [];

    if (isHost) return
    console.log("msg", msg);

    if (!msg.text) return;
    const response = await chatRequest(msg.text);

    if (!response) return;
    whatsappSocket.sendMessage(remoteJid, {text:response});
    console.log(response);
  });
}

module.exports = { initWhatsappBot };
