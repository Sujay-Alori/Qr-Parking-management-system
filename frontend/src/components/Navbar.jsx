import React from 'react';
import { Button } from './ui/button';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Parking Management System</div>
          <div className="flex items-center gap-4">
            <span>Welcome, {user.name}</span>
            <Button variant="ghost" onClick={onLogout} className="text-primary-foreground hover:bg-primary/80">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

