import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
import { searchListController } from "../controllers/searches/searchListController.js";

const router = Router();

/**
 * List
 */
router.get('/:collection/:term', searchListController);




export default router;