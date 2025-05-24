import { Router } from "express";
import RequestsController from "../controllers/Requests.controller.ts";

const router: Router = Router();

router.post('/new-request', RequestsController.newRequest);
router.get('/:token', RequestsController.getRequests);
router.get('/messages/:pedId', RequestsController.getMessages);
router.post('/messages/', RequestsController.sendMessage);

export default router;