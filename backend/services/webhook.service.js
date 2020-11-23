const Router = require("express");
const DialogFlow = require("../dialogflow/dialogflow")
const webhookService = Router();

webhookService.post("/webhook", async (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const dgFlow = new DialogFlow()
  let resp;
  
  if(intent.startsWith("not.")){
    if(await dgFlow.nadaAmostrar(intent)){
      console.log("eiiiiiiiii")
      resp = await dgFlow.apresentarDesculpas()
      console.log("humpf")
      console.log(resp)
      res.json(resp)
    }
    else{
      resp = await dgFlow.apresentarNoticias()
      console.log(resp)
      res.json(resp)
    } 
  }
  
  else res.json({"error":"intent desconhecida"})
  
});

module.exports = webhookService