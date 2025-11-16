import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const CurrentBooking = ({ booking, onCancel }) => {
  const bookingDate = new Date(booking.bookingTime);

  return (
    <Card className="mb-8 border-primary border-2">
      <CardHeader>
        <CardTitle>My Current Booking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Slot {booking.id}</h3>
          <span className="text-sm text-muted-foreground">
            Booked on: {bookingDate.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p>
            Vehicle Number: <strong>{booking.vehicleNumber}</strong>
          </p>
          <Button variant="destructive" size="sm" onClick={onCancel}>
            Cancel Booking
          </Button>
        </div>
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Show this QR code at the parking entrance:
          </p>
          <div className="flex justify-center">
            <QRCodeSVG value={booking.qrCode} size={200} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentBooking;

