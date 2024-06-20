import mongoose from 'mongoose';
import { Schema, Types } from 'mongoose';

// function parseTimeStringToDate(timeString, baseDate) {
//   const [hours, minutes] = timeString.split(':').map(Number);
//   const date = new Date(baseDate);
//   date.setHours(hours);
//   date.setMinutes(minutes);
//   date.setSeconds(0);
//   date.setMilliseconds(0);
//   return date;
// }

const bookingSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      // validate: {
      //   validator: function (value) {
      //     return value instanceof Date && !isNaN(value);
      //   },
      //   message: 'Invalid date',
      // },
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    carId: {
      type: Types.ObjectId,
      ref: 'Car',
      // required: true,
    },
    startTime: {
      type: String,
      required: true,
      // validate: {
      //   validator: function (value) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value); // Validates "HH:MM" format
      //   },
      //   message: 'Invalid start time format',
      // },
    },
    endTime: {
      type: String,
      default: null,
      // validate: {
      //   validator: function (value) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value); // Validates "HH:MM" format
      //   },
      //   message: 'Invalid end time format',
      // },
    },
    totalCost: {
      type: Number,
      default: 0,
      min: [0, 'Total cost must be positive'],
    },
  },
  {
    timestamps: true,
  },
);

// Middleware to check if endTime is after startTime
// bookingSchema.pre('validate', function (next) {
//   const startTimeDate = parseTimeStringToDate(this.startTime, this.date);
//   const endTimeDate = parseTimeStringToDate(this.endTime, this.date);

//   if (endTimeDate <= startTimeDate) {
//     next(new Error('End time must be after start time'));
//   } else {
//     next();
//   }
// });

export const Booking = mongoose.model('Booking', bookingSchema);
