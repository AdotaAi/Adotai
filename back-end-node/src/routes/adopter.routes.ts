import { Router } from "express";
import AdopterController from "../controllers/Adopter.controller.ts";

const router:Router = Router();

router.post('/register', AdopterController.createAdopter);


export default router;