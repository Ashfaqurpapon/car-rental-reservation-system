import express from 'express';
import { PaymentController } from './payment.controller';

const router = express.Router();
router.post(
  '/initiatePayment/:userId',
  //   auth(USER_ROLE.user),
  PaymentController.initiatePayment,
);

router.post('/confirmation', PaymentController.confirmationController);

export const PaymentRoute = router;
