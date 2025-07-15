import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../common/Card';
import { CreditCard, Download, Calendar, DollarSign, TrendingUp, FileText, Plus, Settings } from 'lucide-react';

const BillingUsage: React.FC = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  // Mock data
  const currentUsage = {
    transactions: 1247,
    volume: 125670.50,
    fees: 1256.70,
    limit: 250000
  };

  const billingHistory = [
    { id: 1, date: '2024-01-01', amount: 1256.70, status: 'paid', description: 'Monthly transaction fees', invoice: 'INV-2024-001' },
    { id: 2, date: '2023-12-01', amount: 1108.45, status: 'paid', description: 'Monthly transaction fees', invoice: 'INV-2023-012' },
    { id: 3, date: '2023-11-01', amount: 987.32, status: 'paid', description: 'Monthly transaction fees', invoice: 'INV-2023-011' },
    { id: 4, date: '2023-10-01', amount: 1425.88, status: 'paid', description: 'Monthly transaction fees', invoice: 'INV-2023-010' },
  ];

  const usageMetrics = [
    { label: 'Transactions Processed', value: currentUsage.transactions, icon: FileText, color: 'blue' },
    { label: 'Transaction Volume', value: `$${currentUsage.volume.toLocaleString()}`, icon: DollarSign, color: 'green' },
    { label: 'Total Fees', value: `$${currentUsage.fees.toLocaleString()}`, icon: TrendingUp, color: 'purple' },
    { label: 'Monthly Limit', value: `$${currentUsage.limit.toLocaleString()}`, icon: Settings, color: 'orange' },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing & Usage</h1>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Payment Method</span>
          </button>
        </div>
      </div>

      {/* Usage Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {usageMetrics.map((metric, index) => (
          <Card key={index} className={`bg-gradient-to-r from-${metric.color}-100 to-${metric.color}-200 dark:from-${metric.color}-800 dark:to-${metric.color}-700 border border-${metric.color}-200 dark:border-${metric.color}-600`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-${metric.color}-600 dark:text-${metric.color}-300 text-sm font-medium`}>{metric.label}</p>
                <p className={`text-2xl font-bold text-${metric.color}-800 dark:text-${metric.color}-100`}>{metric.value}</p>
              </div>
              <metric.icon className={`w-8 h-8 text-${metric.color}-500 dark:text-${metric.color}-400`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Usage Chart */}
      <Card title="Usage Overview">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="current">Current Month</option>
              <option value="last">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>

          {/* Progress Bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Transaction Volume</span>
                <span>${currentUsage.volume.toLocaleString()} / ${currentUsage.limit.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(currentUsage.volume / currentUsage.limit) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Transactions Count</span>
                <span>{currentUsage.transactions} / 5000</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(currentUsage.transactions / 5000) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Payment Methods */}
      <Card title="Payment Methods">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/25</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                Primary
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
            </div>
          </div>

          <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-blue-400 hover:text-blue-600 transition-colors">
            + Add New Payment Method
          </button>
        </div>
      </Card>

      {/* Billing History */}
      <Card title="Billing History">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-600">
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Invoice</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((bill) => (
                <tr key={bill.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{formatDate(bill.date)}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{bill.description}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">${bill.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bill.status)}`}>
                      {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{bill.invoice}</td>
                  <td className="py-3 px-4">
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Plan Information */}
      <Card title="Current Plan">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Professional Plan</h3>
            <p className="text-gray-600 dark:text-gray-400">$99/month • Up to 5,000 transactions</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Next billing date: February 1, 2024</p>
          </div>
          <div className="text-right">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Upgrade Plan
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BillingUsage;
