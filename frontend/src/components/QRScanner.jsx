import React, { useState } from 'react';
import { adminAPI } from '../services/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Label } from './ui/label';

const QRScanner = ({ setIsLoading, onClose }) => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setIsLoading(true);
    setError('');
    setScanResult(null);

    try {
      const response = await adminAPI.scanQR(file);
      setScanResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to scan QR code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>QR Code Scanner</CardTitle>
        <CardDescription>Upload an image containing a QR code to verify parking</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="qrFileInput">Choose QR Image</Label>
          <input
            type="file"
            id="qrFileInput"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {scanResult && (
          <div className="space-y-2">
            <h4 className="font-semibold">Scan Result</h4>
            {scanResult.valid ? (
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Valid Parking</h4>
                    <p>
                      Slot ID: <strong>{scanResult.slot.id}</strong>
                    </p>
                    <p>
                      Vehicle Number: <strong>{scanResult.slot.vehicleNumber}</strong>
                    </p>
                    <p>
                      Parking Duration:{' '}
                      <strong>
                        {scanResult.slot.duration.hours}h {scanResult.slot.duration.minutes}m
                      </strong>
                    </p>
                    <p>Booked at: {new Date(scanResult.slot.bookingTime).toLocaleString()}</p>
                  </div>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertDescription>
                  <h4 className="font-semibold">Invalid Parking</h4>
                  <p>{scanResult.message || 'This slot is not currently occupied.'}</p>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={onClose}>
          Close Scanner
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QRScanner;

