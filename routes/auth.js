import { Router } from "express";
import { check } from "express-validator";
import { authLoginController } from "../controllers/auth/authLoginController.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { authGoogleController } from "../controllers/auth/authGoogleController.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { renewTokenController } from "../controllers/auth/renewTokenController.js";


const router = Router();

/**
 * http://localhost:8080/api/auth/login
 */
router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La constaseña es obligatoria').not().isEmpty(),
    validateFields
], authLoginController);



/**
 * http://localhost:8080/api/auth/google
 */
router.post('/google', [
    check('id_token', 'id_token es obligatorio').not().isEmpty(),
    validateFields
], authGoogleController);



// http://localhost:8080/api/auth/
router.get('/', [ 
    validateJWT 
], renewTokenController);


export default router;