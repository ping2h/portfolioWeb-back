import { Router } from 'express';
const accountRouter = Router();
import { deposit, withdraw } from '../controllers/accountController.js';

accountRouter.post('/deposit', deposit);
accountRouter.post('/withdraw', withdraw);

export default accountRouter;

