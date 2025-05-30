import { Router } from "express";
import PetController from "../controllers/Pet.controller";

const router: Router = Router();

router.get('/about/:id', PetController.getPetInfo);


const router = Router();

router.post('/pets/saved', PetController.getSavedPets);

export default router;
