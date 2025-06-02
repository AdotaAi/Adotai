import { Router } from "express";
import RequestsController from "../controllers/Requests.controller.ts";

const router: Router = Router();

router.post('/new', RequestsController.newRequest);
router.get('/:token', RequestsController.getRequests);
router.get('/messages/:pedId', RequestsController.getMessages);
router.post('/messages/', RequestsController.sendMessage);
router.get('/get/:pedId', RequestsController.getRequestInfo);

export default router;