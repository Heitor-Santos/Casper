const NoticiaSchema = require("./noticia-model")

class Noticia{
  async pegarTodasNoticias(){
    const noticias = await NoticiaSchema.find()
    return noticias.length ? noticias.map(noticia=>noticia.toJSON()) : []
  }
  async pegarNoticiasDoTema(tema){
    const noticias = await NoticiaSchema.find({tema:tema})
    return noticias.length ? noticias.map(noticia=>noticia.toJSON()) : []
  }
  async criarNoticia(imageURL, titulo, descricao, tema, link){
    await NoticiaSchema.create({
      imageURL: imageURL,
      titulo: titulo,
      descricao: descricao,
      tema: tema,
      link: link
    })
    const noticiaCriada = await NoticiaSchema.findOne({link:link})
    return noticiaCriada==null ? {error:"houve um erro"} : {success:"notícia criada com sucesso"}  
  }
  
  async editarNoticia(link, tituloNovo, imageURLNovo,descricaoNovo, temaNovo, linkNovo){
    const noticiaUpdt = {
      imageURL: imageURLNovo,
      titulo: tituloNovo,
      descricao: descricaoNovo,
      tema: temaNovo,
      link: linkNovo
    }
    const noticiaAlvo = await NoticiaSchema.updateOne({link:link},noticiaUpdt)
    const noticiaAtualizada = await NoticiaSchema.findOne({link:linkNovo})
    return this.sameNoticia(noticiaUpdt, noticiaAtualizada.toJSON()) ? {success:"notícia atualizada com sucesso"} : {error:"houve um erro"}
  }
  
  async deletarNoticia(link){
    const noticiaAlvo = await NoticiaSchema.deleteOne({link:link})
    const noticiaDeletada = await NoticiaSchema.findOne({link:link})
    return noticiaDeletada==null ? {success:"notícia deletada com sucesso"} : {error:"houve um erro"}
  }
  
  sameNoticia(noticia1, noticia2){
    return noticia1.imageURL==noticia2.imageURL&&
           noticia1.titulo==noticia2.titulo&&
           noticia1.descricao==noticia2.descricao&&
           noticia1.tema==noticia2.tema&&
           noticia1.link==noticia2.link
  }
}

module.exports = Noticia