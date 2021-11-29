import { Router } from "express";
import { getUsers, postUsuario } from "../controller/usuario.controller";

const router = Router();

router.get('/', getUsers);
router.post('/route', postUsuario);

export default router;