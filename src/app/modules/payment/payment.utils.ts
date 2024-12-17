import axios from 'axios';
import config from '../../config';

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(config.PAYMENT_VERIFY_URL!, {
      params: {
        store_id: config.STORE_ID,
        signature_key: config.SIGNETURE_KEY,
        type: 'json',
        request_id: tnxId,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error('Payment validation failed!');
  }
};
