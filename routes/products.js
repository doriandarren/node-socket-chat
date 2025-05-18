import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
import { productListController } from "../controllers/products/productListController.js";
import { productShowController } from "../controllers/products/productShowController.js";
import { productStoreController } from "../controllers/products/productStoreController.js";
import { productUpdateController } from "../controllers/products/productUpdateController.js";
import { productDeleteController } from "../controllers/products/productDeleteController.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { isCategoryExistById, isProductExistById, isRoleValid } from "../helpers/db-validators.js";



const router = Router();

/**
 * List
 */
router.get('/', productListController );


/**
 * show
 */
router.get('/:id', [
    check('id', 'No es un id Mongo válido').isMongoId(),
    check('id').custom( isProductExistById ),
    validateFields
],productShowController);


/**
 * Store
 */
router.post('/', [
    validateJWT,
    check('name', 'El name obligatorio').not().isEmpty(),
    check('category', 'No es un id Mongo válido').isMongoId(),
    check('category').custom( isCategoryExistById ),
    validateFields
],productStoreController);


/**
 * Update
 */
router.put('/:id', [
    validateJWT,
    check('category', 'No es un id Mongo válido').isMongoId(),    
    check('id').custom( isProductExistById ),
    validateFields
],productUpdateController);


/**
 * Delete
 */
router.delete('/:id', [
    validateJWT,
    isRoleValid,
    check('category', 'No es un id Mongo válido').isMongoId(),    
    check('id').custom( isProductExistById ),
    validateFields
], productDeleteController);




export default router;