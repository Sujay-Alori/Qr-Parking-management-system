import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { parkingAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Clock, Car, CheckCircle, CreditCard, AlertCircle } from 'lucide-react';

const CurrentBooking = ({ booking, onCancel, onRefresh }) => {
  const [processing, setProcessing] = useState(false);

  const handleRequestOccupied = async () => {
    if (!window.confirm('Have you parked your vehicle? This will request admin approval.')) {
      return;
    }

    try {
      setProcessing(true);
      await parkingAPI.requestOccupied();
      toast.success('Occupied request submitted. Waiting for admin approval.');
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to submit request');
    } finally {
      setProcessing(false);
    }
  };

  const handleRequestLeaving = async () => {
    if (!window.confirm('Are you ready to leave? This will calculate your parking cost.')) {
      return;
    }

    try {
      setProcessing(true);
      const response = await parkingAPI.requestLeaving();
      toast.success('Leaving request submitted. Please make payment.');
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to submit request');
    } finally {
      setProcessing(false);
    }
  };

  const handlePayment = async () => {
    if (!window.confirm(`Pay ₹${booking.cost}?`)) {
      return;
    }

    try {
      setProcessing(true);
      await parkingAPI.processPayment();
      toast.success('Payment successful! Waiting for admin approval.');
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = () => {
    switch (booking.status) {
      case 'reserved':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Reserved</span>;
      case 'occupied':
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Parked</span>;
      case 'leaving':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Leaving</span>;
      default:
        return null;
    }
  };

  const reservationDate = booking.reservationTime ? new Date(booking.reservationTime) : null;
  const arrivalDate = booking.arrivalTime ? new Date(booking.arrivalTime) : null;
  const parkedDate = booking.parkedTime ? new Date(booking.parkedTime) : null;

  return (
    <Card className="mb-8 border-primary border-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>My Current Booking</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Slot {booking.id}</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-muted-foreground" />
            <p>Vehicle: <strong>{booking.vehicleNumber}</strong></p>
          </div>
          {reservationDate && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm">Reserved: {reservationDate.toLocaleString()}</p>
            </div>
          )}
          {arrivalDate && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm">Arrival: {arrivalDate.toLocaleString()}</p>
            </div>
          )}
          {parkedDate && (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-sm">Parked: {parkedDate.toLocaleString()}</p>
            </div>
          )}
        </div>

        {/* Reservation QR Code */}
        {booking.status === 'reserved' && booking.reservationQrCode && (
          <div className="text-center space-y-2 p-4 bg-blue-50 rounded">
            <p className="text-sm font-medium">Reservation QR Code</p>
            <div className="flex justify-center">
              <QRCodeSVG value={booking.reservationQrCode} size={150} />
            </div>
            {booking.occupiedRequestStatus === 'pending' && (
              <div className="flex items-center justify-center gap-2 text-yellow-600">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm">Waiting for admin approval</p>
              </div>
            )}
            {arrivalDate && new Date() >= arrivalDate && booking.occupiedRequestStatus !== 'pending' && booking.occupiedRequestStatus !== 'approved' && (
              <Button onClick={handleRequestOccupied} disabled={processing} className="mt-2">
                I Have Parked
              </Button>
            )}
          </div>
        )}

        {/* Occupied QR Code */}
        {booking.status === 'occupied' && booking.occupiedQrCode && (
          <div className="text-center space-y-2 p-4 bg-green-50 rounded">
            <p className="text-sm font-medium">Parking Token QR Code</p>
            <div className="flex justify-center">
              <QRCodeSVG value={booking.occupiedQrCode} size={150} />
            </div>
            <Button onClick={handleRequestLeaving} disabled={processing} className="mt-2" variant="outline">
              Request to Leave
            </Button>
          </div>
        )}

        {/* Leaving/Payment Section */}
        {booking.status === 'leaving' && (
          <div className="space-y-4 p-4 bg-yellow-50 rounded">
            {booking.cost > 0 && (
              <div className="flex items-center justify-between p-3 bg-white rounded">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Total Cost:</span>
                </div>
                <span className="text-2xl font-bold">₹{booking.cost}</span>
              </div>
            )}
            {booking.paymentStatus === 'pending' && (
              <Button onClick={handlePayment} disabled={processing} className="w-full" size="lg">
                <CreditCard className="w-4 h-4 mr-2" />
                Pay Now
              </Button>
            )}
            {booking.paymentStatus === 'paid' && (
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <p className="font-medium">Payment Completed. Waiting for admin approval.</p>
              </div>
            )}
          </div>
        )}

        <Button variant="destructive" size="sm" onClick={onCancel} disabled={processing}>
          Cancel Booking
        </Button>
      </CardContent>
    </Card>
  );
};

export default CurrentBooking;
