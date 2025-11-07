import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api';

interface User {
  _id: string;
  email: string;
  username: string;
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({ email: '', username: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/admin/users');
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
      } else {
        setError(data.error || 'Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditForm({ email: user.email, username: user.username });
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    
    try {
      const res = await apiFetch(`/api/admin/users/${editingUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      const data = await res.json();
      
      if (res.ok) {
        alert('User updated successfully!');
        setEditingUser(null);
        fetchUsers();
      } else {
        alert(data.error || 'Failed to update user');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Failed to update user');
    }
  };

  const handleDelete = async (userId: string, username: string) => {
    if (!confirm(`Are you sure you want to delete user "${username}"?`)) return;
    
    try {
      const res = await apiFetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      
      if (res.ok) {
        alert('User deleted successfully!');
        fetchUsers();
      } else {
        alert(data.error || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div style={{ width: '100%', padding: '0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h4 style={{ margin: '0', fontWeight: 'bold' }}>All Users</h4>
        <span style={{ background: '#0d6efd', color: 'white', padding: '8px 16px', borderRadius: '4px' }}>
          {users.length} Total Users
        </span>
      </div>

      <div style={{ 
        background: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '100%',
        overflowX: 'auto'
      }}>
        <table style={{ 
          width: '100%', 
          minWidth: '900px',
          borderCollapse: 'collapse',
          tableLayout: 'fixed'
        }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', width: '100px', fontWeight: '600' }}>#</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', width: '250px', fontWeight: '600' }}>Username</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', width: '300px', fontWeight: '600' }}>Email</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', width: '150px', fontWeight: '600' }}>User ID</th>
              <th style={{ padding: '16px 20px', textAlign: 'center', width: '200px', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} style={{ borderBottom: '1px solid #e9ecef' }}>
                <td style={{ padding: '20px', fontSize: '15px' }}>{index + 1}</td>
                <td style={{ padding: '20px', fontSize: '16px', fontWeight: '600' }}>{user.username}</td>
                <td style={{ padding: '20px', fontSize: '15px' }}>{user.email}</td>
                <td style={{ padding: '20px', fontSize: '14px', color: '#6c757d' }}>{user._id.slice(-8)}</td>
                <td style={{ padding: '20px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleEdit(user)}
                    title="Edit User"
                    style={{
                      background: 'transparent',
                      border: '1px solid #0d6efd',
                      color: '#0d6efd',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '8px',
                      fontSize: '14px'
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id, user.username)}
                    title="Delete User"
                    style={{
                      background: 'transparent',
                      border: '1px solid #dc3545',
                      color: '#dc3545',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#6c757d' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
          <p>No users found</p>
        </div>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
