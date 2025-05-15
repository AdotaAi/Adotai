import { Router } from "express";
import userRoutes from "./user.routes.ts";
import imgRoutes from "./img.routes.ts";
import petRoutes from "./pet.routes.ts";

const router:Router = Router();

router.use('/user', userRoutes);
router.use('/img', imgRoutes);
router.use('/pet', petRoutes)

export default router;