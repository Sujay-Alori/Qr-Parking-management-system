import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';

const ParkingSlots = ({ slots, onReserve }) => {
  const [vehicleNumbers, setVehicleNumbers] = useState({});
  const [arrivalTimes, setArrivalTimes] = useState({});

  const handleVehicleChange = (slotId, value) => {
    setVehicleNumbers({ ...vehicleNumbers, [slotId]: value.toUpperCase() });
  };

  const handleArrivalTimeChange = (slotId, value) => {
    setArrivalTimes({ ...arrivalTimes, [slotId]: value });
  };

  const handleReserve = (slotId) => {
    const vehicleNumber = vehicleNumbers[slotId]?.trim();
    const arrivalTime = arrivalTimes[slotId];

    if (!vehicleNumber) {
      toast.error('Please enter a vehicle number');
      return;
    }

    if (!arrivalTime) {
      toast.error('Please select an arrival time');
      return;
    }

    // Check if arrival time is at least 1 hour from now
    const selectedTime = new Date(arrivalTime);
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    if (selectedTime < oneHourFromNow) {
      toast.error('Arrival time must be at least 1 hour from now');
      return;
    }

    onReserve(slotId, vehicleNumber, selectedTime.toISOString());
    setVehicleNumbers({ ...vehicleNumbers, [slotId]: '' });
    setArrivalTimes({ ...arrivalTimes, [slotId]: '' });
  };

  // Get minimum datetime (1 hour from now)
  const getMinDateTime = () => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    return oneHourLater.toISOString().slice(0, 16);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {slots.map((slot) => (
        <Card key={slot.id} className="relative border-green-500 border-2 bg-green-50">
          <CardContent className="p-6 space-y-4">
            <div className="absolute top-2 left-2 font-bold text-lg">{slot.id}</div>
            <div className="text-center pt-4">
              <div className="text-green-600 font-medium mb-4">Available</div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`vehicle-${slot.id}`} className="text-sm">Vehicle Number</Label>
                  <Input
                    id={`vehicle-${slot.id}`}
                    type="text"
                    placeholder="ABC123"
                    value={vehicleNumbers[slot.id] || ''}
                    onChange={(e) => handleVehicleChange(slot.id, e.target.value)}
                    maxLength="10"
                    className="uppercase tracking-wider font-medium"
                  />
                </div>
                <div>
                  <Label htmlFor={`arrival-${slot.id}`} className="text-sm">Arrival Time</Label>
                  <Input
                    id={`arrival-${slot.id}`}
                    type="datetime-local"
                    min={getMinDateTime()}
                    value={arrivalTimes[slot.id] || ''}
                    onChange={(e) => handleArrivalTimeChange(slot.id, e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Must be at least 1 hour from now
                  </p>
                </div>
                <Button
                  variant="default"
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleReserve(slot.id)}
                >
                  Reserve Slot
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ParkingSlots;
