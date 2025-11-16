import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Car, User, Clock } from 'lucide-react';

const AdminRequests = ({ setIsLoading, onApproval }) => {
  const [occupiedRequests, setOccupiedRequests] = useState([]);
  const [leavingRequests, setLeavingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('occupied');

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const [occupiedRes, leavingRes] = await Promise.all([
        adminAPI.getRequests('occupied'),
        adminAPI.getRequests('leaving')
      ]);
      setOccupiedRequests(occupiedRes.data);
      setLeavingRequests(leavingRes.data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveOccupied = async (slotId) => {
    try {
      setIsLoading(true);
      await adminAPI.approveOccupied(slotId);
      toast.success('Approved');
      await loadRequests();
      if (onApproval) onApproval();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectOccupied = async (slotId) => {
    if (!window.confirm('Reject this request?')) return;
    try {
      setIsLoading(true);
      await adminAPI.rejectOccupied(slotId);
      toast.success('Rejected');
      await loadRequests();
      if (onApproval) onApproval();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveLeaving = async (slotId) => {
    if (!window.confirm('Approve and complete transaction?')) return;
    try {
      setIsLoading(true);
      await adminAPI.approveLeaving(slotId);
      toast.success('Completed');
      await loadRequests();
      if (onApproval) onApproval();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const requests = activeType === 'occupied' ? occupiedRequests : leavingRequests;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <Button
          variant={activeType === 'occupied' ? 'default' : 'outline'}
          onClick={() => setActiveType('occupied')}
        >
          Occupied ({occupiedRequests.length})
        </Button>
        <Button
          variant={activeType === 'leaving' ? 'default' : 'outline'}
          onClick={() => setActiveType('leaving')}
        >
          Leaving ({leavingRequests.length})
        </Button>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No pending requests
          </CardContent>
        </Card>
      ) : (
        requests.map((request) => {
          const parkedTime = request.parkedTime ? new Date(request.parkedTime) : null;
          const duration = parkedTime ? Math.floor((new Date() - parkedTime) / (1000 * 60)) : 0;
          const hours = Math.floor(duration / 60);
          const minutes = duration % 60;

          return (
            <Card key={request._id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-bold">
                      <Car className="w-4 h-4" />
                      Slot {request.id} - {request.vehicleNumber}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {request.bookedBy?.name} ({request.bookedBy?.email})
                    </div>
                    {activeType === 'leaving' && parkedTime && (
                      <>
                        <div className="text-sm">Parked: {parkedTime.toLocaleString()}</div>
                        <div className="text-sm">Duration: {hours}h {minutes}m</div>
                        <div className="text-lg font-bold text-green-600">Cost: ₹{request.cost}</div>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {activeType === 'occupied' ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleRejectOccupied(request.id)}>
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm" onClick={() => handleApproveOccupied(request.id)}>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => handleApproveLeaving(request.id)}>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default AdminRequests;
