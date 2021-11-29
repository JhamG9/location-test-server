"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controller/usuario.controller");
const router = (0, express_1.Router)();
router.get('/', usuario_controller_1.getUsers);
router.post('/route', usuario_controller_1.postUsuario);
exports.default = router;
//# sourceMappingURL=usuario.router.js.map