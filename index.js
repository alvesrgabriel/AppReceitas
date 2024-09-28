const express = require("express")//para usar o express
const server = express ()//para criar um servidor

server.get("/", (req, res)=>{
    return res.json({mensagem:"Hello NODE"})
})

server.get("/msg", (req, res)=>{
    return res.json({mensagem:"Olá!"})
})

server.listen(3300, ()=>{
    console.log('server ON')
})