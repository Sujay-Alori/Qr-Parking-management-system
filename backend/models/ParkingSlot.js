const mongoose = require('mongoose');

const parkingSlotSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'occupied', 'leaving', 'maintenance'],
    default: 'available'
  },
  vehicleNumber: {
    type: String,
    default: null
  },
  reservationTime: {
    type: Date,
    default: null
  },
  arrivalTime: {
    type: Date,
    default: null
  },
  bookingTime: {
    type: Date,
    default: null
  },
  parkedTime: {
    type: Date,
    default: null
  },
  leavingRequestTime: {
    type: Date,
    default: null
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  qrCode: {
    type: String,
    required: true
  },
  reservationQrCode: {
    type: String,
    default: null
  },
  occupiedQrCode: {
    type: String,
    default: null
  },
  occupiedRequestStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', null],
    default: null
  },
  leavingRequestStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', null],
    default: null
  },
  cost: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', null],
    default: null
  },
  paymentTime: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for faster queries
parkingSlotSchema.index({ status: 1 });
parkingSlotSchema.index({ bookedBy: 1 });

module.exports = mongoose.model('ParkingSlot', parkingSlotSchema);

