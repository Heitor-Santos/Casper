const Noticia = require("../database/noticia");

const noticiaDB = new Noticia();

class DialogFlow {
  
  DialogFlow() {
    this.noticias = [];
  }
  
  async nadaAmostrar(intent) {
    const temas = {
      "not.entretenimento":"Entretenimento",
      "not.esportes": "Esportes",
      "not.politica": "Política",
      "not.famosos": "Famosos"
    }
    const tema = temas[intent]
    this.noticias = await noticiaDB.pegarNoticiasDoTema(tema);
    return this.noticias.length ? false : true;
  }
  
  apresentarNoticias() {
    console.log("noticias :")
    console.log(this.noticias)
    const dialogNoticias = this.gerarDialogNoticias(this.noticias.reverse().slice(0,10))
    console.log(dialogNoticias)
    const presentable = this.gerarFullFillment(dialogNoticias)
    console.log("pres: ")
    console.log(presentable)
    return presentable;
  }
  
  apresentarDesculpas() {
     return {
          "fulfillmentMessages": [
            {
              "payload": {
                "facebook": {
                    "text": "Desculpe, não achamos nenhuma notícia desse tema :/ . Tente outro tópico.",
                    "quick_replies":[
                      {
                        "content_type":"text",
                        "title":"Esportes",
                        "payload":"Esportes"
                      },
                      {
                        "content_type":"text",
                        "title":"Política",
                        "payload": "Política"
                      },
                      {
                        "content_type":"text",
                        "title":"Entretenimento",
                        "payload":"Entretenimento"
                      },
                      {
                        "content_type":"text",
                        "title":"Famosos",
                        "payload":"Famosos"
                      },
                    ] 
                  }
                }
              }
            ]
          }
  }
  
  gerarDialogNoticias(noticias){
    const pres = noticias.map(noticia => {
      return {
        title: noticia.titulo,
        image_url: noticia.imageURL,
        subtitle: noticia.descricao,
        buttons: [{
            type: "web_url",
            url: noticia.link,
            title: "Saiba mais"
        }]
    }})
    return pres
  }
  
  gerarFullFillment(carrousel){
    const fullfillment = {fulfillmentMessages: [{
          payload: {
            facebook: {
              attachment: {
                type: "template",
                payload: {
                  template_type: "generic",
                  elements: carrousel
      }}}}}]
      }
    return fullfillment
  }
}
module.exports = DialogFlow