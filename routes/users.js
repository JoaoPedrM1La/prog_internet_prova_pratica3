import { Router } from "express";
import authMiddleware from "../middleware/auth";
import { teste, mostrarUser, mostrarUserPorId, atualizarUser, deletarUser } from "../controllers/usersController";

const route = Router();

route.use(authMiddleware);

route.get('/teste', teste);
route.get('/', mostrarUser);
route.get('/:id', mostrarUserPorId);
route.put('/:id', atualizarUser);
route.delete('/:id', deletarUser);

export default route;