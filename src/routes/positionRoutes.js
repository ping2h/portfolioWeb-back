import express from 'express';
import * as positionController from '../controllers/positionController.js';

const router = express.Router();

router.get('/all', positionController.getAll);
router.get('/:type', positionController.getPositionByType)
router.put('/buy/:type', positionController.buyPosition);
router.put('/sell/:type', positionController.sellPosition);
router.put('/price/:type', positionController.updatePositionPrice);

export default router;