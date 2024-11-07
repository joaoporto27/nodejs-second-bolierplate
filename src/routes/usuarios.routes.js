import { Router } from "express";
import UsersRepository from "../models/users/UsersRepository.js";


const carrosRoutes = Router();
const usersList = new UsersRepository();

carrosRoutes.get("/", (req, res) => {
    const carros = usersList.getAllUsers();

    return res.status(200).json({
        message: carros.length == 0
        ? "Não há carros cadastrados"
        : `Total de usuários: ${carros.length}`,
    carros,
    })
})

carrosRoutes.post("/", (req, res) => {
    const { name, email, password } = req.body;

    const user = usersList.addUser(name, email, password);
  
    return res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user,
    });
  });

  carrosRoutes.get("/:id", (req, res) => {
    const { id } = req.params;

    const user = usersList.getUserById(id);
  
    if (!user) {
      return res.status(404).json({
        message: `Usuário com id ${id} não encontrado!`,
      });
    }
  
    return res.status(200).json({
      message: `Usuário com id ${id} encontrado!`,
      user,
    });
  });
  
  carrosRoutes.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    
    const user = usersList.updateUser(id, name, email, password);
  
    if (!user) {
      return res.status(404).json({
        message: `Usuário com id ${id} não encontrado!`,
      });
    }
  
    return res.status(200).json({
      message: `Usuário com id ${id} atualizado com sucesso!`,
      user,
    });
  });
  
  carrosRoutes.delete("/:id", (req, res) => {
    const { id } = req.params;
    const user = usersList.deleteUser(id);
    if (!user) {
      return res.status(404).json({
        message: `Usuário com id ${id} não encontrado!`,
      });
    }
    return res.status(200).json({
      message: `Usuário com id ${id} deletado com sucesso!`,
      user,
    });
  });
export default carrosRoutes;
