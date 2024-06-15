import express from 'express';
import { carCreateController } from './car_create_controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  createCarValidationSchema,
  updateCarValidationSchema,
} from './car_create_validation';
// import validateRequest from '../../middleware/validateRequest';
// import { createCarValidationSchema } from './car_create_validation';

const router = express.Router();
router.post(
  '/',
  validateRequest(createCarValidationSchema),
  carCreateController.createCar,
);
router.get('/', carCreateController.getAllACreatedCar);
router.get('/:id', carCreateController.getSingleCreatedCar);
router.put(
  '/:id',
  validateRequest(updateCarValidationSchema),
  carCreateController.updateCreatedCar,
);
router.delete('/:id', carCreateController.deleteSingleCreatedCar);

export const carCreateRoute = router;
