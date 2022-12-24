import * as express from "express";
import { VideoController } from "../controllers";

const router = express.Router();
router.post('/watermart', VideoController.handleWatermart)

export default router;