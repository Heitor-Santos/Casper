import axios from 'axios'

const api = axios.create({
    baseURL: "https://elite-thunder-question.glitch.me/noticias"
})

async function getNoticias(){
    console.log("uee")
    const noticias = await api.get('/todasnoticias')
    console.log("ein")
    console.log(noticias)
    return noticias.data;
}

async function criarNoticia(imageURL, descricao, tema, link, titulo){
    const body={imageURL, descricao, tema, link, titulo}
    const res = await api.post('/criarnoticia',body)
    return res.data
}

async function editNoticia(imageURL, descricao, tema, link, linkNovo, titulo){
    const body={imageURL, descricao, tema, link, titulo, linkNovo}
    const res = await api.put('/editarnoticia',body)
    return res.data
}

async function deleteNoticia(link){
    console.log("oooolaa")
    const res = await api.delete(`/deletarnoticia?link=${link}`)
    return res.data
}

async function isValid(pin){
    const res = await api.get(`/valid?pin=${pin}`)
    return res
}
export {getNoticias, criarNoticia, editNoticia, deleteNoticia, isValid}