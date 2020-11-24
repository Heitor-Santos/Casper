const Router = require("express");
const DialogFlow = require("../dialogflow/dialogflow")
const webhookService = Router();

webhookService.post("/webhook", async (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const dgFlow = new DialogFlow()
  let resp;
  
  if(intent.startsWith("not.")){
    if(await dgFlow.nadaAmostrar(intent)){
      resp = await dgFlow.apresentarDesculpas()
      res.json(resp)
    }
    else{
      resp = await dgFlow.apresentarNoticias()
      res.json(resp)
    } 
  }
  
  else res.json({"error":"intent desconhecida"})
  
});

module.exports = webhookService