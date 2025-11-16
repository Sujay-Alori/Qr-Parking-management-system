import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const AdminStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{stats.totalSlots}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Total Slots</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-600">{stats.availableSlots}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Available</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-red-600">{stats.occupiedSlots}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Occupied</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;

