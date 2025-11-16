import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { adminAPI } from '../services/api';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const AdminParkingSlots = ({ slots, onRelease }) => {
  const [qrCodes, setQrCodes] = useState({});

  useEffect(() => {
    const loadQRCodes = async () => {
      const availableSlots = slots.filter(slot => slot.status === 'available');
      const qrPromises = availableSlots.map(async (slot) => {
        try {
          const response = await adminAPI.getQRCode(slot.id);
          return { slotId: slot.id, qrCode: response.data.qrCode };
        } catch (error) {
          console.error(`Error loading QR for ${slot.id}:`, error);
          return null;
        }
      });

      const qrResults = await Promise.all(qrPromises);
      const qrMap = {};
      qrResults.forEach((result) => {
        if (result) {
          qrMap[result.slotId] = result.qrCode;
        }
      });
      setQrCodes(qrMap);
    };

    if (slots.length > 0) {
      loadQRCodes();
    }
  }, [slots]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {slots.map((slot) => {
        const isAvailable = slot.status === 'available';
        const bookingDate = slot.bookingTime ? new Date(slot.bookingTime) : null;

        return (
          <Card
            key={slot.id}
            className={`relative ${
              isAvailable
                ? 'border-green-500 border-2 bg-green-50'
                : 'border-red-500 border-2 bg-red-50'
            }`}
          >
            <CardContent className="p-6 space-y-4">
              <div className="absolute top-2 left-2 font-bold text-lg">{slot.id}</div>
              <div className="text-center pt-4">
                <div
                  className={`font-medium mb-4 ${
                    isAvailable ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isAvailable ? 'Available' : 'Occupied'}
                </div>

                {isAvailable ? (
                  <div className="flex justify-center">
                    <QRCodeSVG value={slot.qrCode} size={150} />
                  </div>
                ) : (
                  <>
                    <div className="space-y-2 text-sm">
                      <p>
                        Vehicle: <strong>{slot.vehicleNumber}</strong>
                      </p>
                      {bookingDate && (
                        <p>
                          Booked: <small>{bookingDate.toLocaleString()}</small>
                        </p>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      className="w-full mt-4"
                      onClick={() => onRelease(slot.id)}
                    >
                      Release Slot
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminParkingSlots;

