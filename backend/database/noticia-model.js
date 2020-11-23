const mongoose = require('mongoose') 

const NoticiaSchema = new mongoose.Schema({
    imageURL: String,
    titulo: String,
    descricao: String,
    tema: String,
    link: String
})

module.exports = mongoose.model('Noticia', NoticiaSchema)