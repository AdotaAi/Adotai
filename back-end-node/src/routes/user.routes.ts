import { Router, Request, Response } from "express";
import adopterRoutes from "./adopter.routes.ts";
import ongRoutes from "./ong.routes.ts";
import db from "../config/db.ts";
import UserController from "../controllers/User.controller.ts";

const router:Router = Router();


router.use('/adopter', adopterRoutes);
router.use('/ong', ongRoutes);
router.post('/login', UserController.login);
router.get('/profile/:token', UserController.getProfile);

export default router;