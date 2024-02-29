FROM node:latest

# Establece el directorio de trabajo en el contenedor
WORKDIR /messenger-bot

# Copia los archivos del proyecto al contenedor
ADD . .

# Instala las dependencias de Node.js
RUN npm install

CMD ["npm", "start"]
