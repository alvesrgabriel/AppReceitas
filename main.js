const express = require("express");
const rotas = express();
const Sequelize = require("sequelize");

/*Banco de dados*/
const conexaoBanco = new Sequelize("receitas", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

/*Banco de dados
--create table--*/
const Receita = conexaoBanco.define("Receita", {
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
const Igredientes = conexaoBanco.define("Igredientes", {
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
const Usuario = conexaoBanco.define("Usuario", {
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

-------------------------------------
---ROTAS---
*/

rotas.get("/", function (req, res) {
    res.send("Rota Principal!");
});

rotas.get("/receita/:nome/:tempoPreparo/:modoPreparo/:descricao", async function (req, res) {
    const { nome, tempoPreparo, modoPreparo, descricao } = req.params;

    const novaReceita = await Receita.create({ nome, tempoPreparo, modoPreparo, descricao }); //função que espera

    res.json({
        resposta: "Receita adicionada com sucesso!",
        receita: novaReceita,
    });
});
rotas.get("/igredientes/:nome/:quantidade/:unidadeMedida", async function (req, res) {
    const { nome, quantidade, unidadeMedida } = req.params;

    const novoIgrediente = await Igredientes.create({ nome, quantidade, unidadeMedida });

    res.json({
        resposta: "Igredientes adicionados com sucesso!",
        igredientes: novoIgrediente,
    });
  });
rotas.get("/usuario/:nome/:email/:senha", async function (req, res) {
    const { nome, email, senha } = req.params;

    const novoUsuario = await Usuario.create({ nome, email, senha });

    res.json({
        resposta: "Usuário cadastrado com sucesso!",
        usuario: novoUsuario,
    });
});

//Exibir todos as informações

rotas.get("/mostrar_receita", async function (req, res) {
    const receita = await Receita.findAll(); //Busca todos os registros
    res.json(receita); //Retorna os registros em formato JSON
});

rotas.get("/mostrar_igrediente", async function (req, res) {
    const igredientes = await Igredientes.findAll(); //Busca todos os registros
    res.json(igredientes); //Retorna os registros em formato JSON
});

rotas.get("/mostrar_usuario", async function (req, res) {
    const usuario = await Usuario.findAll(); //Busca todos os registros
    res.json(usuario); //Retorna os registros em formato JSON
});

//Deletar informações pelo o ID

rotas.get("/deletar_receita/:id", async function (req, res) {
    const { id } = req.params;
    const idNumber = parseInt(id, 10); //Converte id para número

    const deleted = await Receita.destroy({
        where: { id: idNumber},
    });

    if (deleted) {
        res.json({ mensagem: "Receita deletada com sucesso!" });
    } else {
        res.status(404).json({ mensagem: "Receita não encontrado!" });
    }
});

rotas.get("/deletar_igredientes/:id", async function (req, res) {
    const { id } = req.params;
    const idNumber = parseInt(id, 10); //Converte id para número

    const deleted = await Igredientes.destroy({
        where: { id: idNumber},
    });

    if (deleted) {
        res.json({ mensagem: "Igrediente deletado com sucesso!" });
    } else {
        res.status(404).json({ mensagem: "Igrediente não encontrado!" });
    }
});

rotas.get("/deletar_usuario/:id", async function (req, res) {
    const { id } = req.params;
    const idNumber = parseInt(id, 10); //Converte id para número

    const deleted = await Usuario.destroy({
        where: { id: idNumber},
    });

    if (deleted) {
        res.json({ mensagem: "Usuário deletado com sucesso!" });
    } else {
        res.status(404).json({ mensagem: "Usuário não encontrado!" });
    }
});

//Fazer updates via ID

rotas.get("/editar_receita/:id/:nome/:tempoPreparo/:modoPreparo/:descricao", async function (req, res) {
  const { id, nome, tempoPreparo, modoPreparo, descricao } = req.params;
  const idNumber = parseInt(id, 10); // Converte o ID para número

  const [updated] = await Receita.update(
    { nome, tempoPreparo, modoPreparo, descricao },
    {
      where: { id: idNumber }, // Usa o ID numérico
    }
  );

  res.json({
    mensagem: "Receita atualizada com sucesso!",
  });
});

rotas.get("/editar_igredientes/:id/:nome/:quantidade/:unidadeMedida", async function (req, res) {
  const { id, nome, quantidade, unidadeMedida } = req.params;
  const idNumber = parseInt(id, 10); // Converte o ID para número

  const [updated] = await Igredientes.update(
    { nome, quantidade, unidadeMedida },
    {
      where: { id: idNumber }, // Usa o ID numérico
    }
  );

  res.json({
    mensagem: "Igrediente atualizado com sucesso!",
  });
});

rotas.get("/editar_usuario/:id/:nome/:email/:senha", async function (req, res) {
  const { id, nome, email, senha } = req.params;
  const idNumber = parseInt(id, 10); // Converte o ID para número

  const [updated] = await Usuario.update(
    { nome, email, senha },
    {
      where: { id: idNumber }, // Usa o ID numérico
    }
  );

  res.json({
    mensagem: "Usuário atualizado com sucesso!",
  });
});

/*Servidor*/

rotas.listen(3031, function () {
    console.log("Server is running on port 3031");
});