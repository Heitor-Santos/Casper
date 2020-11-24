const Router = require("express")
const Noticia = require("../database/noticia")

const noticiasService = Router()
const noticiaDB = new Noticia()

noticiasService.get("/noticias/valid",async(req,res)=>{
  const pin = req.query.pin
  if(pin==process.env.pin) res.json(true)
  else res.json(false)
})

noticiasService.get("/noticias/todasnoticias",async(req,res)=>{
  const resp = await noticiaDB.pegarTodasNoticias()
  res.json(resp)
})

noticiasService.post("/noticias/criarnoticia", async(req,res)=>{
  const [imageURL, descricao, tema, link, titulo] = 
        [req.body.imageURL, req.body.descricao, req.body.tema, req.body.link, req.body.titulo]
  const resp = await noticiaDB.criarNoticia(imageURL, titulo, descricao, tema, link)
  res.json(resp)
})

noticiasService.put("/noticias/editarnoticia", async(req,res)=>{
  const [imageURL, descricao, tema, link, titulo, linkNovo] = 
        [req.body.imageURL, req.body.descricao, req.body.tema, req.body.link, req.body.titulo, req.body.linkNovo]
  const resp = await noticiaDB.editarNoticia(link, titulo, imageURL, descricao, tema, linkNovo)
  res.json(resp)
})

noticiasService.delete("/noticias/deletarnoticia", async(req,res)=>{
  const link = req.query.link
  const resp = await noticiaDB.deletarNoticia(link)
  res.json(resp)
})

module.exports = noticiasService