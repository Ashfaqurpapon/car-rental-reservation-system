import express from 'express';
import { carCreateController } from './car_create_controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  createCarValidationSchema,
  updateCarValidationSchema,
} from './car_create_validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../userNew/user.constant';

const router = express.Router();
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(createCarValidationSchema),
  carCreateController.createCar,
);

router.get('/:id', carCreateController.getSingleCreatedCar);
router.get('/', carCreateController.getAllACreatedCar);
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  carCreateController.deleteSingleCreatedCar,
);

router.put('/return', auth(USER_ROLE.admin), carCreateController.returnCar);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateCarValidationSchema),
  carCreateController.updateCreatedCar,
);
export const carCreateRoute = router;
