import React, { useState } from 'react';
import SalesChart from '../components/admin/SalesChart';
import UsersTable from '../components/admin/UsersTable';
import ProductsTable from '../components/admin/ProductsTable';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'products'>('analytics');

  return (
    <div className="container-fluid py-5 px-4" style={{ minHeight: '80vh', maxWidth: '1600px', margin: '0 auto' }}>
      <h1 className="mb-4 fw-bold text-primary">Admin Dashboard</h1>
      
      {/* Tabs Navigation */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
            style={{ cursor: 'pointer', fontSize: '16px', padding: '12px 24px' }}
          >
            <i className="bi bi-graph-up me-2"></i>
            Sales Analytics
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
            style={{ cursor: 'pointer', fontSize: '16px', padding: '12px 24px' }}
          >
            <i className="bi bi-people me-2"></i>
            Users Management
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
            style={{ cursor: 'pointer', fontSize: '16px', padding: '12px 24px' }}
          >
            <i className="bi bi-box-seam me-2"></i>
            Products Management
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content" style={{ width: '100%' }}>
        {activeTab === 'analytics' && (
          <div className="tab-pane fade show active">
            <SalesChart />
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="tab-pane fade show active">
            <UsersTable />
          </div>
        )}
        
        {activeTab === 'products' && (
          <div className="tab-pane fade show active">
            <ProductsTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
