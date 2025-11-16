import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { adminAPI } from '../services/api';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Wrench } from 'lucide-react';

const AdminParkingSlots = ({ slots, onStatusChange, setIsLoading = () => {} }) => {
  const handleStatusChange = async (slotId, newStatus) => {
    try {
      setIsLoading(true);
      await adminAPI.updateSlotStatus(slotId, newStatus);
      toast.success(`Slot ${slotId} updated`);
      if (onStatusChange) onStatusChange();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRelease = async (slotId) => {
    if (!window.confirm(`Release slot ${slotId}?`)) return;
    try {
      setIsLoading(true);
      await adminAPI.releaseSlot(slotId);
      toast.success('Released');
      if (onStatusChange) onStatusChange();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      available: 'border-green-500 bg-green-50',
      reserved: 'border-blue-500 bg-blue-50',
      occupied: 'border-red-500 bg-red-50',
      leaving: 'border-yellow-500 bg-yellow-50',
      maintenance: 'border-gray-500 bg-gray-50'
    };
    return colors[status] || 'border-gray-500 bg-gray-50';
  };

  const getStatusIcon = (status) => {
    const icons = {
      available: <CheckCircle className="w-5 h-5 text-green-600" />,
      occupied: <XCircle className="w-5 h-5 text-red-600" />,
      maintenance: <Wrench className="w-5 h-5 text-gray-600" />
    };
    return icons[status] || null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {slots.map((slot) => {
        const bookingDate = slot.bookingTime ? new Date(slot.bookingTime) : null;
        const parkedDate = slot.parkedTime ? new Date(slot.parkedTime) : null;

        return (
          <Card key={slot.id} className={`relative ${getStatusColor(slot.status)} border-2`}>
            <CardContent className="p-4 space-y-3">
              <div className="absolute top-2 left-2 font-bold">{slot.id}</div>
              <div className="text-center pt-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {getStatusIcon(slot.status)}
                  <span className="font-medium capitalize">{slot.status}</span>
                </div>

                {slot.status === 'available' && slot.qrCode && (
                  <div className="flex justify-center mb-3">
                    <QRCodeSVG value={slot.qrCode} size={120} />
                  </div>
                )}

                {slot.status === 'occupied' && (
                  <>
                    <div className="text-sm space-y-1 mb-3">
                      <p>Vehicle: <strong>{slot.vehicleNumber}</strong></p>
                      {parkedDate && <p>Parked: {parkedDate.toLocaleString()}</p>}
                      {slot.bookedBy && <p className="text-xs">{slot.bookedBy.name}</p>}
                    </div>
                    <Button variant="destructive" size="sm" className="w-full mb-2" onClick={() => handleRelease(slot.id)}>
                      Release
                    </Button>
                  </>
                )}

                {slot.status === 'reserved' && (
                  <div className="text-sm mb-3">
                    <p>Vehicle: <strong>{slot.vehicleNumber}</strong></p>
                    {slot.arrivalTime && <p>Arrival: {new Date(slot.arrivalTime).toLocaleString()}</p>}
                  </div>
                )}

                {slot.status === 'leaving' && (
                  <div className="text-sm mb-3">
                    <p>Vehicle: <strong>{slot.vehicleNumber}</strong></p>
                    <p className="font-bold text-green-600">Cost: ₹{slot.cost}</p>
                    <p className="text-xs">{slot.paymentStatus === 'paid' ? 'Paid' : 'Pending'}</p>
                  </div>
                )}

                <div className="flex gap-1">
                  {slot.status !== 'available' && (
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleStatusChange(slot.id, 'available')}>
                      Available
                    </Button>
                  )}
                  {slot.status !== 'maintenance' && (
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleStatusChange(slot.id, 'maintenance')}>
                      Maintenance
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminParkingSlots;
