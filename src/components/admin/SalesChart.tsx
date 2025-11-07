import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalesData {
  date: string;
  totalSales: number;
  orderCount: number;
}

const SalesChart: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/sales-analytics');
      const data = await res.json();
      if (data.salesData) {
        setSalesData(data.salesData);
        
        // Calculate totals
        const revenue = data.salesData.reduce((sum: number, item: SalesData) => sum + item.totalSales, 0);
        const orders = data.salesData.reduce((sum: number, item: SalesData) => sum + item.orderCount, 0);
        setTotalRevenue(revenue);
        setTotalOrders(orders);
      } else {
        setError(data.error || 'Failed to fetch sales data');
      }
    } catch (err) {
      console.error('Error fetching sales data:', err);
      setError('Failed to load sales analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <div style={{ 
          display: 'inline-block',
          width: '3rem',
          height: '3rem',
          border: '0.25em solid #0d6efd',
          borderRightColor: 'transparent',
          borderRadius: '50%',
          animation: 'spinner-border .75s linear infinite'
        }}>
          <span style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: '0' }}>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div style={{ background: '#f8d7da', color: '#842029', padding: '16px', borderRadius: '8px', border: '1px solid #f5c2c7' }}>{error}</div>;
  }

  return (
    <div style={{ width: '100%', padding: '0' }}>
      {/* Summary Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px', 
        marginBottom: '32px',
        width: '100%'
      }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: '24px',
          color: 'white'
        }}>
          <h6 style={{ fontSize: '14px', marginBottom: '12px', opacity: 0.9, fontWeight: '400' }}>Total Revenue</h6>
          <h2 style={{ fontSize: '32px', margin: '0', fontWeight: 'bold' }}>${totalRevenue.toFixed(2)}</h2>
        </div>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: '24px',
          color: 'white'
        }}>
          <h6 style={{ fontSize: '14px', marginBottom: '12px', opacity: 0.9, fontWeight: '400' }}>Total Orders</h6>
          <h2 style={{ fontSize: '32px', margin: '0', fontWeight: 'bold' }}>{totalOrders}</h2>
        </div>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: '24px',
          color: 'white'
        }}>
          <h6 style={{ fontSize: '14px', marginBottom: '12px', opacity: 0.9, fontWeight: '400' }}>Average Order Value</h6>
          <h2 style={{ fontSize: '32px', margin: '0', fontWeight: 'bold' }}>
            ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}
          </h2>
        </div>
      </div>

      {/* Sales Chart */}
      <div style={{ 
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '32px',
        width: '100%',
        minHeight: '500px'
      }}>
        <h5 style={{ fontSize: '20px', marginBottom: '32px', fontWeight: 'bold', color: '#212529' }}>Sales Over Time</h5>
        {salesData.length > 0 ? (
          <div style={{ width: '100%', height: '450px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  label={{ value: 'Date', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  label={{ value: 'Sales ($)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value: number) => `$${value.toFixed(2)}`}
                  labelStyle={{ color: '#666' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="totalSales" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Total Sales ($)"
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="orderCount" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Order Count"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#6c757d' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <p style={{ margin: '16px 0 0 0', fontSize: '16px' }}>No sales data available yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesChart;
