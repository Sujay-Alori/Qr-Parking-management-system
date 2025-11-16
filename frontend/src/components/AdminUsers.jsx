import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import toast from 'react-hot-toast';
import { Ban, CheckCircle } from 'lucide-react';

const AdminUsers = ({ setIsLoading = () => {} }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setIsLoading(true);
      const response = await adminAPI.getUsers({ search: searchTerm });
      setUsers(response.data.users);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load users');
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadUsers();
  };

  const handleBlock = async (userId, userName) => {
    if (!window.confirm(`Block ${userName}?`)) return;
    try {
      setIsLoading(true);
      await adminAPI.blockUser(userId);
      toast.success('Blocked');
      loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnblock = async (userId, userName) => {
    if (!window.confirm(`Unblock ${userName}?`)) return;
    try {
      setIsLoading(true);
      await adminAPI.unblockUser(userId);
      toast.success('Unblocked');
      loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Search</Button>
      </form>

      {users.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No users found
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user._id} className={user.isBlocked ? 'border-red-500 bg-red-50' : ''}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{user.name}</span>
                      {user.isBlocked && (
                        <span className="px-2 py-1 text-xs bg-red-500 text-white rounded">Blocked</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                    <div className="text-xs text-muted-foreground">
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    {user.isBlocked ? (
                      <Button variant="outline" size="sm" onClick={() => handleUnblock(user._id, user.name)}>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Unblock
                      </Button>
                    ) : (
                      <Button variant="destructive" size="sm" onClick={() => handleBlock(user._id, user.name)}>
                        <Ban className="w-4 h-4 mr-1" />
                        Block
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
