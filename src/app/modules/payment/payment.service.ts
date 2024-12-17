import axios from 'axios';
import config from '../../config';
import { verifyPayment } from './payment.utils';

import { IPaymentData } from './payment.interface';
import { OrderHistoryServices } from '../OrderHistory/OrderHistory.service';

const initiatePayment = async (userId: string, paymentData: IPaymentData) => {
  try {
    const response = await axios.post(config.PAYMENT_URL!, {
      store_id: config.STORE_ID,
      signature_key: config.SIGNETURE_KEY,
      tran_id: paymentData.transactionId,
      success_url: `${config.BASE_API}/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `${config.BASE_API}/api/payment/confirmation?status=failed`,
      cancel_url: `${config.Frontent_API_Home}`,
      amount: paymentData.totalPrice,
      currency: 'BDT',
      desc: 'Merchant Registration Payment',
      cus_name: paymentData.custormerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'N/A',
      cus_phone: paymentData.customerPhone,
      type: 'json',
    });
    return response.data;
  } catch (err) {
    throw new Error('Payment initiation failed!');
  }
};

const confirmationPaymentService = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  let message = '';

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    AfterSuccessFullPayment(transactionId);
    message = 'Successfully Paid!';
  } else {
    message = 'Payment Failed!';
  }
  const htmlTemplate = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Payment Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          .container {
            text-align: center;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            padding: 40px 20px;
            max-width: 400px;
          }
          .icon {
            margin: 0 auto 20px auto;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: scaleUp 0.6s ease-out;
          }
          .icon.success {
            background-color: #28a745;
          }
          .icon.failure {
            background-color: #dc3545;
          }
          .icon svg {
            fill: white;
            width: 50px;
            height: 50px;
          }
          h1 {
            margin: 20px 0 10px;
            font-size: 24px;
            color: #333;
          }
          p {
            margin: 0 0 20px;
            font-size: 16px;
            color: #555;
          }
          button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }
          button:hover {
            background-color: #0056b3;
          }
          @keyframes scaleUp {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon ${verifyResponse && verifyResponse.pay_status === 'Successful' ? 'success' : 'failure'}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 11.146 4.354l4.853 4.853 4.854-4.854 2.853 2.854-7.707 7.707a.5.5 0 01-.708 0l-7.707-7.707L.146 4a8 8 0 1116 4z"
              />
            </svg>
          </div>
          <h1>${message}</h1>
          <p>Thank you for your payment. You will receive a confirmation email shortly.</p>
          <a href="https://eshop-dun-five.vercel.app/">
            <button>Back to Home</button>
          </a>
        </div>
      </body>
    </html>
  `;
  return htmlTemplate;
};

const AfterSuccessFullPayment = async (transactionId: string) => {
  const res = OrderHistoryServices.updateTransactionsStatus(transactionId);
  return res;
};

export const PaymentServices = { initiatePayment, confirmationPaymentService };
