const mongoose = require('mongoose');

const parkingSlotSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['available', 'occupied'],
    default: 'available'
  },
  vehicleNumber: {
    type: String,
    default: null
  },
  bookingTime: {
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
  }
}, {
  timestamps: true
});

// Index for faster queries
parkingSlotSchema.index({ status: 1 });
parkingSlotSchema.index({ bookedBy: 1 });

module.exports = mongoose.model('ParkingSlot', parkingSlotSchema);

