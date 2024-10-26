//import library
const Sequelize = require("sequelize");
//keys
const conexaoComBanco = new Sequelize("receitas", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Receita = conexaoComBanco.define("Receita", {
    nome: {
      type: Sequelize.STRING,
    },
    tempoPreparo: {
      type: Sequelize.TIME,
    },
    modoPreparo: {
      type: Sequelize.TEXT,
    },
    descricao: {
      type: Sequelize.TEXT,
    },
});
const Igredientes = conexaoComBanco.define("Igredientes", {
  nome: {
    type: Sequelize.STRING,
  },
  quantidade: {
    type: Sequelize.DECIMAL,
  },
  unidadeMedida: {
    type: Sequelize.STRING,
  },
  
});
const Usuario = conexaoComBanco.define("Usuario", {
  nome: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  senha: {
    type: Sequelize.STRING,
  },
});
/*Aqui é pra rodar quando criar a coluna
//Receita.sync({ force: true });
//Igredientes.sync({ force: true });
//Usuario.sync({ force: true });
*/
//INSERT
Receita.create({
  nome: "Bolo de cenoura",
  tempoPreparo: "00:40:00",
  modoPreparo: "Misture os ingredientes e asse por 30 minutos",
  descricao: "Um bolo saboroso feito com cenouras frescas.",
});
Igredientes.create({
  nome: "Cenoura",
  quantidade: "2",
  unidadeMedida: "unidades",
});
Usuario.create({
  nome: "usuario1",
  email: "usuario1@example.com",
  senha: "senha1",
});

