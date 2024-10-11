import express from "express";

import UserController from "../controllers/User.controller";

const userController = new UserController();

const userRouter = express();

// 1. CRUD dla modelu User (Użytkownik)
// a) Tworzenie użytkownika:

userRouter.post("/users", userController.addNewUser);

// b) Odczyt wszystkich użytkowników:

userRouter.get("/users", userController.getAllUsers);

// c) Odczyt konkretnego użytkownika:

userRouter.get("/users/:id", userController.getSelectedUser);

// d) Aktualizacja użytkownika:

userRouter.put("/users/:id", userController.updateUser);

// e) Usunięcie użytkownika:

userRouter.delete("/users/:id", userController.removeUser);

export default userRouter;
