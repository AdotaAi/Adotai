import { Router } from "express";
import userRoutes from "./user.routes.ts";
import imgRoutes from "./img.routes.ts";
import petRoutes from "./pet.routes.ts";
import requestsRoutes from "./requests.route.ts";

const router:Router = Router();

router.use('/user', userRoutes);
router.use('/img', imgRoutes);
router.use('/pet', petRoutes);
router.use('/requests', requestsRoutes);

export default router;