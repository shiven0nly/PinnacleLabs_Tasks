import express from 'express';
import { updateUser } from '../controllers/userController';
import { verifyToken } from '../utils/verifyToken';

const router = express.Router();


router.put("/update/:userId",verifyToken, updateUser);


export default router;