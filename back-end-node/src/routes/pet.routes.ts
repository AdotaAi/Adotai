import { Router } from "express";
import PetController from "../controllers/Pet.controller";

const router: Router = Router();

router.get('/about/:id', PetController.getPetInfo);

export default router;