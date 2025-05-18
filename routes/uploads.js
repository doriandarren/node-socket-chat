import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
import { uploadStoreController } from "../controllers/uploads/uploadStoreController.js";
import { uploadUpdateController } from "../controllers/uploads/uploadUpdateController.js";
import { collectionsAllowed } from "../helpers/db-validators.js";
import { validateUploadFile } from "../middlewares/validate-file.js";
import { uploadShowController } from "../controllers/uploads/uploadShowController.js";



const router = Router();


/**
 * Store
 */
router.post('/', [ validateUploadFile ], uploadStoreController);



/**
 * Update
 */
router.put('/:collection/:id', [
    validateUploadFile,
    check('id', 'El id debe ser MongoDB').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['users', 'products']) ),
    validateFields,
], uploadUpdateController);



/**
 * Show
 */
router.get('/:collection/:id', [
    check('id', 'El id debe ser MongoDB').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['users', 'products']) ),
    validateFields,
], uploadShowController);




export default router;