import { Types } from 'mongoose';

export interface TBooking {
  // confusion . I think, better to use mongo _id
  //   id: string;

  date: Date;
  user: Types.ObjectId;
  carId: Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
}

export interface TReturnBooking {
  bookingId: Types.ObjectId;
  endTime: string;
}
