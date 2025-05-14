import { Router } from "express";
import AdopterController from "../controllers/Adopter.controller.ts";

const router:Router = Router();

router.post('/register', AdopterController.createAdopter);
router.post('/profile', AdopterController.getProfile);

export default router;