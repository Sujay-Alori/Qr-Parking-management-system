const mongoose = require('mongoose');

const completedParkingSchema = new mongoose.Schema({
  slotId: {
    type: String,
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reservationTime: {
    type: Date,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  parkedTime: {
    type: Date,
    required: true
  },
  leavingRequestTime: {
    type: Date,
    required: true
  },
  completedTime: {
    type: Date,
    required: true
  },
  duration: {
    hours: {
      type: Number,
      required: true
    },
    minutes: {
      type: Number,
      required: true
    },
    totalMinutes: {
      type: Number,
      required: true
    }
  },
  cost: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'failed'],
    required: true
  },
  paymentTime: {
    type: Date,
    required: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for faster queries
completedParkingSchema.index({ user: 1 });
completedParkingSchema.index({ completedTime: -1 });
completedParkingSchema.index({ slotId: 1 });

module.exports = mongoose.model('CompletedParking', completedParkingSchema);

