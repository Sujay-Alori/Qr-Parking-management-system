import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { adminAPI } from '../services/api';
import AdminParkingSlots from './AdminParkingSlots';
import AdminUsers from './AdminUsers';
import AdminRequests from './AdminRequests';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { ParkingCircle, Users, Ban, Wrench, Clock } from 'lucide-react';

const AdminDashboard = ({ setIsLoading = () => {} }) => {
  const [stats, setStats] = useState({
    parking: { totalSlots: 0, availableSlots: 0, occupiedSlots: 0, reservedSlots: 0, leavingSlots: 0, maintenanceSlots: 0 },
    users: { totalUsers: 0, activeUsers: 0, blockedUsers: 0 },
    requests: { pendingOccupiedRequests: 0, pendingLeavingRequests: 0 }
  });
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [statsResponse, slotsResponse] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getSlots()
      ]);
      setStats(statsResponse.data);
      setSlots(slotsResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error(error.response?.data?.error || 'Failed to load data');
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <Button variant="outline" onClick={loadData}>
          Refresh
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="parking">Slots</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Parking Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{stats.parking?.totalSlots || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Total</p>
                </CardContent>
              </Card>
              <Card className="border-green-500">
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">{stats.parking?.availableSlots || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Available</p>
                </CardContent>
              </Card>
              <Card className="border-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600">{stats.parking?.reservedSlots || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Reserved</p>
                </CardContent>
              </Card>
              <Card className="border-red-500">
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">{stats.parking?.occupiedSlots || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Occupied</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-500">
                <CardHeader>
                  <CardTitle className="text-lg text-yellow-600">{stats.parking?.leavingSlots || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Leaving</p>
                </CardContent>
              </Card>
              <Card className="border-gray-500">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-600">{stats.parking?.maintenanceSlots || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Maintenance</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Pending Requests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-yellow-500">
                <CardHeader>
                  <CardTitle className="text-xl text-yellow-600">{stats.requests?.pendingOccupiedRequests || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Occupied Requests</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">{stats.requests?.pendingLeavingRequests || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Leaving Requests</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">User Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{stats.users?.totalUsers || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Total Users</p>
                </CardContent>
              </Card>
              <Card className="border-green-500">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">{stats.users?.activeUsers || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Active Users</p>
                </CardContent>
              </Card>
              <Card className="border-red-500">
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">{stats.users?.blockedUsers || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Blocked Users</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <AdminRequests setIsLoading={setIsLoading} onApproval={loadData} />
        </TabsContent>

        <TabsContent value="parking" className="space-y-6">
          <AdminParkingSlots slots={slots} onStatusChange={loadData} setIsLoading={setIsLoading} />
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <AdminUsers setIsLoading={setIsLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
