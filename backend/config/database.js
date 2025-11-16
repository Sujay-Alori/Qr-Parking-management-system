const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Initialize parking slots if they don't exist
    await initializeParkingSlots();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const initializeParkingSlots = async () => {
  const ParkingSlot = require('../models/ParkingSlot');
  const slotCount = await ParkingSlot.countDocuments();

  if (slotCount === 0) {
    const sectionLetters = ['A', 'B', 'C'];
    const slotsPerSection = 6;
    const slots = [];

    sectionLetters.forEach(section => {
      for (let i = 1; i <= slotsPerSection; i++) {
        const slotId = `${section}-${i.toString().padStart(2, '0')}`;
        slots.push({
          id: slotId,
          status: 'available',
          vehicleNumber: null,
          bookingTime: null,
          bookedBy: null,
          qrCode: `parking_slot:${slotId}`
        });
      }
    });

    await ParkingSlot.insertMany(slots);
    console.log('Parking slots initialized');
  }
};

module.exports = connectDB;

