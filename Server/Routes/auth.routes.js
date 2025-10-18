import express from 'express';
import { ragister, login,logout, profile } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/ragister",ragister);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me",authMiddleware,profile);


export default router;