const express = require("express");
const rotas = express();
const Sequelize = require("sequelize");
const cors = require("cors");
rotas.use(cors());

/*Banco de dados*/
const conexaoBanco = new Sequelize("receitas", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

/*Banco de dados
--create table--*/
const receita = conexaoBanco.define("receita", {
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
const ingredientes = conexaoBanco.define("ingredientes", {
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
const usuario = conexaoBanco.define("usuario", {
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
//Aqui é pra rodar quando criar a coluna

//receita.sync({ force: true });
//ingredientes.sync({ force: true });
//usuario.sync({ force: true });

/*
-------------------------------------
---ROTAS---
*/

rotas.get("/", function (req, res) {
    res.send("Rota Principal!");
});

rotas.get("/receita/:nome/:tempoPreparo/:modoPreparo/:descricao", async function (req, res) {
    const { nome, tempoPreparo, modoPreparo, descricao } = req.params;

    const novaReceita = await receita.create({ nome, tempoPreparo, modoPreparo, descricao }); //função que espera

    res.json({
        resposta: "Receita adicionada com sucesso!",
        receita: novaReceita,
    });
});
rotas.get("/ingredientes/:nome/:quantidade/:unidadeMedida", async function (req, res) {
    const { nome, quantidade, unidadeMedida } = req.params;

    const novoIngrediente = await ingredientes.create({ nome, quantidade, unidadeMedida });

    res.json({
        resposta: "Ingredientes adicionados com sucesso!",
        ingredientes: novoIngrediente,
    });
  });
rotas.get("/usuario/:nome/:email/:senha", async function (req, res) {
    const { nome, email, senha } = req.params;

    const novoUsuario = await usuario.create({ nome, email, senha });

    res.json({
        resposta: "Usuário cadastrado com sucesso!",
        usuario: novoUsuario,
    });
});

//Exibir todos as informações

rotas.get("/mostrar_receita", async function (req, res) {
    const mostraReceita = await receita.findAll(); //Busca todos os registros
    res.json(mostraReceita); //Retorna os registros em formato JSON
});

rotas.get("/mostrar_ingredientes", async function (req, res) {
    const mostrarIngredientes = await ingredientes.findAll(); //Busca todos os registros
    res.json(mostrarIngredientes); //Retorna os registros em formato JSON
});

/*rotas.get("/mostrar_usuario", async function (req, res) {
    const usuario = await Usuario.findAll(); //Busca todos os registros
    res.json(usuario); //Retorna os registros em formato JSON
});
*/

//Exibir informações do usuário com tratativas de erro
rotas.get("/mostrar_usuario", async function (req, res) {
  try {
      const mostrarUsuario = await usuario.findAll(); // Busca todos os registros
      res.json(mostrarUsuario); // Retorna os registros em formato JSON
  } catch (error) {
      res.status(500).json({ message: `Erro ao buscar usuário: ${error}` }); // Retorna erro ao cliente
  }
});

//Deletar informações pelo o ID

rotas.get("/deletar_receita/:id", async function (req, res) {
    const { id } = req.params;
    const idNumber = parseInt(id, 10); //Converte id para número

    const deleted = await receita.destroy({
        where: { id: idNumber},
    });

    if (deleted) {
        res.json({ mensagem: "Receita deletada com sucesso!" });
    } else {
        res.status(404).json({ mensagem: "Receita não encontrado!" });
    }
});

rotas.get("/deletar_ingredientes/:id", async function (req, res) {
    const { id } = req.params;
    const idNumber = parseInt(id, 10); //Converte id para número

    const deleted = await ingredientes.destroy({
        where: { id: idNumber},
    });

    if (deleted) {
        res.json({ mensagem: "Ingrediente deletado com sucesso!" });
    } else {
        res.status(404).json({ mensagem: "Ingrediente não encontrado!" });
    }
});

/*rotas.get("/deletar_usuario/:id", async function (req, res) {
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
});*/

//Deletar informações do usuário com tratativas de erro

rotas.get("/deletar_usuario/:id", async function (req, res) {
  try{
    const { id } = req.params;
    const idNumber = parseInt(id, 10); //Converte id para número

    const deleted = await usuario.destroy({
        where: { id: idNumber},
    });

    if (deleted) {
        res.json({ mensagem: "Usuário deletado com sucesso!" });
    } else {
        res.status(404).json({ mensagem: "Usuário não encontrado!" });
    }
  } catch (error) {
    res.status(500).json({ message: `Erro ao deletar usuário: ${error}` }); // Retorna erro ao cliente
  }
});
//Fazer updates via ID

rotas.get("/editar_receita/:id/:nome/:tempoPreparo/:modoPreparo/:descricao", async function (req, res) {
  const { id, nome, tempoPreparo, modoPreparo, descricao } = req.params;
  const idNumber = parseInt(id, 10); // Converte o ID para número

  const [updated] = await receita.update(
    { nome, tempoPreparo, modoPreparo, descricao },
    {
      where: { id: idNumber }, // Usa o ID numérico
    }
  );

  res.json({
    mensagem: "Receita atualizada com sucesso!",
  });
});

rotas.get("/editar_ingredientes/:id/:nome/:quantidade/:unidadeMedida", async function (req, res) {
  const { id, nome, quantidade, unidadeMedida } = req.params;
  const idNumber = parseInt(id, 10); // Converte o ID para número

  const [updated] = await ingredientes.update(
    { nome, quantidade, unidadeMedida },
    {
      where: { id: idNumber }, // Usa o ID numérico
    }
  );

  res.json({
    mensagem: "Ingrediente atualizado com sucesso!",
  });
});

/*rotas.get("/editar_usuario/:id/:nome/:email/:senha", async function (req, res) {
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
});*/

//Editar informações do usuário com tratativas de erro

rotas.get("/editar_usuario/:id/:nome/:email/:senha", async function (req, res) {
  try{
    const { id, nome, email, senha } = req.params;
    const idNumber = parseInt(id, 10); // Converte o ID para número

    const [updated] = await usuario.update(
      { nome, email, senha },
      {
        where: { id: idNumber }, // Usa o ID numérico
      }
    );

    res.json({
      mensagem: "Usuário atualizado com sucesso!",
    });
  } catch (error) {
    res.status(500).json({ message: `Erro ao editar usuário: ${error}` }); // Retorna erro ao cliente
  }
});

/*Servidor*/

rotas.listen(3031, function () {
    console.log("Server is running on port 3031");
});