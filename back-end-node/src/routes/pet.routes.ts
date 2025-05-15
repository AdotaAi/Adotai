import { Router } from "express";
import PetController from "../controllers/Pet.controller";

const router: Router = Router();

router.get('/pet/:id', PetController.getPetId);