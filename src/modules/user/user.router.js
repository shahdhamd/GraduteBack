import express from "express";
const { Router } = express;
import * as user from './controller/user.controller.js'
import { endpoint } from "./user.endpoint.js";
import {validation} from '../../middlewares/validation.js'
import { auth } from "../../middlewares/auth.js";
import * as validationUser from './user.validation.js'
import { fileValidation, myMulter } from "../../services/multer.js";
const router=Router()

router.get('/',auth(endpoint.getAllUser),user.getAllUser)
router.post('/',auth(endpoint.addAccount),validation(validationUser.createUserAccount),user.createUserAccount)
router.delete('/:id',auth(endpoint.deleteUser),user.deleteUser)
router.patch('/',auth(endpoint.upload),myMulter(fileValidation.imag).single('image'),user.uploadimage)
router.patch('/update/:id',auth(endpoint.updateUserInfo),validation(validationUser.updateUserInfo),user.updateUserInfo)


export default router;
