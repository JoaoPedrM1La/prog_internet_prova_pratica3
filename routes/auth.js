import { Router } from "express";
import { registrar, logar } from "../controllers/authController";

const route = Router();

route.post('/register', registrar);
route.post('/login', logar);

export default route;