import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
import { categoryListController } from "../controllers/categories/categoryListController.js";
import { categoryShowController } from "../controllers/categories/categoryShowController.js";
import { categoryStoreController } from "../controllers/categories/categoryStoreController.js";
import { categoryUpdateController } from "../controllers/categories/categoryUpdateController.js";
import { categoryDeleteController } from "../controllers/categories/categoryDeleteController.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { isCategoryExistById } from "../helpers/db-validators.js";
import { isAdminRole } from "../middlewares/validate-roles.js";


const router = Router();


// Base:  http://localhost:8080/api/auth


/**
 * http://localhost:8080/api/auth/login
 */
// List
router.get('/', categoryListController);


// Show
router.get('/:id', [
    check('id', 'No es un id Mongo válido').isMongoId(),
    check('id').custom( isCategoryExistById ),
    validateFields
], categoryShowController);


// Store
router.post('/', [
    validateJWT,
    check('name', 'El name obligatorio').not().isEmpty(),
    validateFields
], categoryStoreController);



// Update
router.put('/:id', [
    validateJWT,
    check('id', 'No es un id Mongo válido').isMongoId(),    
    check('name', 'El name obligatorio').not().isEmpty(),
    check('id').custom( isCategoryExistById ),
    validateFields
], categoryUpdateController);



// Delete
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un id Mongo válido').isMongoId(),
    check('id').custom( isCategoryExistById ),
    validateFields
],categoryDeleteController);



export default router;