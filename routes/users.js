
import { Router } from "express"; 
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { isEmailExist, isRoleValid, isUserExistById } from "../helpers/db-validators.js";
import { userStoreController } from "../controllers/users/userStoreController.js";
import { userUpdateController } from "../controllers/users/userUpdateController.js";
import { userListController } from "../controllers/users/userListController.js";
import { userDeleteController } from "../controllers/users/userDeleteController.js";
import { userShowController } from "../controllers/users/userShowController.js";
import { isAdminRole, hasRole } from "../middlewares/validate-roles.js";


const router = Router();


// TODO BASE: http://localhost:8080/api/usuarios/


/**
 * List
 * http://localhost:8080/api/usuarios/
 */

router.get('/', userListController);



/**
 * Show
 * http://localhost:8080/api/usuarios/99999999
 */
router.get('/:id', [
    validateJWT,
    //isAdminRole,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),  //Validar role
    validateFields
], userShowController);




/**
 * Update
 *  http://localhost/8080/api/usuarios/99999999
 */
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isUserExistById ),
    check('role').custom( isRoleValid ),
    validateFields
], userUpdateController);



/**
 * Store
 * 
 * http://localhost:8080/api/usuarios/
 */
router.post('/', [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mas de 6 letras').isLength({min:6}),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( isEmailExist ),
    // check('rol', 'No es  un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isRoleValid ),
    validateFields
], userStoreController);



/**
 * Delete
 */
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isUserExistById ),
    validateFields
], userDeleteController);


export default router;