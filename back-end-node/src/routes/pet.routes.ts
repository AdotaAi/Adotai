import { Router } from "express";
import PetController from "../controllers/Pet.controller";

const router: Router = Router();

router.get('/about/:id', PetController.getPetInfo);

router.post('/saved', PetController.getSavedPets);

router.get('/get/:userId', PetController.getRecomendedPets);

export default router;