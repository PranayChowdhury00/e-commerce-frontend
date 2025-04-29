import { useState } from 'react';
import { FaUserCog, FaBell, FaShieldAlt, FaDatabase, FaPalette } from 'react-icons/fa';
import { MdPayment, MdEmail } from 'react-icons/md';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    siteName: 'My Store',
    adminEmail: 'admin@example.com',
    maintenanceMode: false,
    currency: 'USD',
    themeColor: '#3b82f6',
    notificationEnabled: true,
    backupFrequency: 'weekly'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings to backend
    console.log('Settings saved:', formData);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', name: 'General', icon: <FaUserCog /> },
    { id: 'notifications', name: 'Notifications', icon: <FaBell /> },
    { id: 'security', name: 'Security', icon: <FaShieldAlt /> },
    { id: 'payments', name: 'Payments', icon: <MdPayment /> },
    { id: 'email', name: 'Email', icon: <MdEmail /> },
    { id: 'appearance', name: 'Appearance', icon: <FaPalette /> },
    { id: 'backup', name: 'Backup', icon: <FaDatabase /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Admin Settings</h2>
        </div>
        <nav className="p-2">
          <ul>
            {tabs.map(tab => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center w-full p-3 rounded-lg ${activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6 capitalize">{activeTab} Settings</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Site Name</label>
                <input
                  type="text"
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Admin Email</label>
                <input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  name="maintenanceMode"
                  checked={formData.maintenanceMode}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="maintenanceMode">Maintenance Mode</label>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notificationEnabled"
                  name="notificationEnabled"
                  checked={formData.notificationEnabled}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="notificationEnabled">Enable Email Notifications</label>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notification Email</label>
                <input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payments' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Stripe Publishable Key</label>
                <input
                  type="text"
                  placeholder="pk_test_..."
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stripe Secret Key</label>
                <input
                  type="password"
                  placeholder="sk_test_..."
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="testMode"
                  className="mr-2"
                />
                <label htmlFor="testMode">Test Mode</label>
              </div>
            </div>
          )}

          {/* Add more tabs as needed */}

          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;