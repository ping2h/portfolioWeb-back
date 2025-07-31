import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();


/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 example: testuser
 *               password:
 *                 type: string
 *                 example: 123456
 *               email:
 *                 type: string
 *                 example: test@example.com
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: integer
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Username already exists
 *       500:
 *         description: Server error
 */
router.post('/register', userController.register);


//TODO
// add swagger documentation for login
router.post('/login', userController.login);

// TODO
// swagger
router.get('/me', userController.getMe)

// TODO
// add swagger documentation for logout
router.post('/logout', userController.logout);

export default router;