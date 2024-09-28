const express = require("express")//para usar o express
const server = express ()//para criar um servidor
const alunos = require("./src/teste.json")
const receita = require("./src/receita.json")

server.get("/", (req, res)=>{
    return res.json({mensagem:"Hello NODE"})
})

server.get("/msg", (req, res)=>{
    return res.json({mensagem:"Olá!!"})
})

server.get("/alunos", (req, res)=>{
    return res.json(alunos)
})

server.get("/receita", (req, res)=>{
    return res.json(receita)
})

server.listen(3300, ()=>{
    console.log('server ON')
})

