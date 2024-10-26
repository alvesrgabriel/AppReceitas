//import librarys
const Sequelize = require("sequelize");
const express = require("express");
//Clonando a varável com poderes das bibliotecas 
const app = express();
const { create } = require("express-handlebars");

//###CONEXÃO BANCO DE DADOS###
const conexaoComBanco = new Sequelize("receitas", "root", "", {
    host: "localhost",
    dialect: "mysql",
  });
//### FIM CONEXÃO BANCO DE DADOS###

//###ROTAS:
  app.get("/", function (req, res) {
    res.send("Aplicativo de Receitas");
  });

  app.get("/receita/:nome/:tempoPreparo/:modoPreparo/:descricao", function (req, res) {
      res.send(req.params);
  });

  app.get("/igredientes/:nome/:quantidade/:unidadeMedida", function (req, res) {
    res.send(req.params);
  });

  app.get("/usuario/:nome/:email/:senha", function (req, res) {
    res.send(req.params);
  });

  app.get("/htmlteste", function (req, res) {
    res.sendFile(__dirname + "/html/index.html");
  });
  //###FIM ROTAS
  
//"LIGANDO O SERVIDOR"
//SEMPRE MANTENHA NO FINAL DO CÒDIGO
app.listen(3300, ()=>{
    console.log('server ON')
})

