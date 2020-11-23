const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const Noticia = require("./database/noticia")
const noticiasService = require("./services/noticias.service")
const webhookService = require("./services/webhook.service")

mongoose.connect(`mongodb+srv://casper:${process.env.DB_PASSWORD}@cluster0.ydpne.mongodb.net/${process.env.DB_NAME}
  ?retryWrites=true&w=majority`)

const noticiaDB = new Noticia()
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use("/", noticiasService);
app.use("/", webhookService);

const listener = app.listen(process.env.PORT, () => {
  console.log("Escutando na porta " + listener.address().port);
});