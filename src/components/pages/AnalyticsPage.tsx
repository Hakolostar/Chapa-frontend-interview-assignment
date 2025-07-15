import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  CreditCard,
  Activity,
  Download
} from 'lucide-react';

// Mock data for analytics
const transactionData = [
  { month: 'Jan', transactions: 450, revenue: 12500, users: 89 },
  { month: 'Feb', transactions: 580, revenue: 15200, users: 134 },
  { month: 'Mar', transactions: 620, revenue: 18700, users: 187 },
  { month: 'Apr', transactions: 750, revenue: 22100, users: 245 },
  { month: 'May', transactions: 890, revenue: 28900, users: 312 },
  { month: 'Jun', transactions: 950, revenue: 32400, users: 398 },
  { month: 'Jul', transactions: 1100, revenue: 38200, users: 456 },
  { month: 'Aug', transactions: 1250, revenue: 42800, users: 523 },
  { month: 'Sep', transactions: 1180, revenue: 39600, users: 487 },
  { month: 'Oct', transactions: 1320, revenue: 45200, users: 567 },
  { month: 'Nov', transactions: 1450, revenue: 51300, users: 634 },
  { month: 'Dec', transactions: 1680, revenue: 58700, users: 721 },
];

const dailyData = [
  { day: 'Mon', transactions: 89, amount: 2340 },
  { day: 'Tue', transactions: 127, amount: 3890 },
  { day: 'Wed', transactions: 156, amount: 4560 },
  { day: 'Thu', transactions: 134, amount: 3920 },
  { day: 'Fri', transactions: 198, amount: 5680 },
  { day: 'Sat', transactions: 234, amount: 6780 },
  { day: 'Sun', transactions: 167, amount: 4320 },
];

const paymentMethodData = [
  { name: 'Credit Card', value: 45, color: '#3B82F6' },
  { name: 'Bank Transfer', value: 30, color: '#10B981' },
  { name: 'Mobile Money', value: 15, color: '#F59E0B' },
  { name: 'Cash', value: 10, color: '#EF4444' },
];

const statusData = [
  { name: 'Successful', value: 85, color: '#10B981' },
  { name: 'Pending', value: 10, color: '#F59E0B' },
  { name: 'Failed', value: 5, color: '#EF4444' },
];

const regionData = [
  { region: 'North America', transactions: 2500, revenue: 89500 },
  { region: 'Europe', transactions: 1800, revenue: 67200 },
  { region: 'Asia Pacific', transactions: 3200, revenue: 95800 },
  { region: 'Latin America', transactions: 1200, revenue: 34500 },
  { region: 'Africa', transactions: 800, revenue: 28900 },
];

const AnalyticsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Revenue',
      value: '$425,300',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      title: 'Total Transactions',
      value: '12,840',
      change: '+8.2%',
      trend: 'up',
      icon: CreditCard,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      title: 'Active Users',
      value: '5,234',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      title: 'Success Rate',
      value: '98.5%',
      change: '+2.1%',
      trend: 'up',
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-gray-900 dark:text-white font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' && entry.name.toLowerCase().includes('revenue') 
                ? `$${entry.value.toLocaleString()}` 
                : entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your business performance and insights
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <div className={`flex items-center mt-2 ${stat.color}`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Revenue Trend
            </h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
            >
              <option value="revenue">Revenue</option>
              <option value="transactions">Transactions</option>
              <option value="users">Users</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickFormatter={(value) => selectedMetric === 'revenue' ? `$${value/1000}k` : value}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={selectedMetric}
                stroke="#3B82F6"
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Daily Transactions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Daily Transaction Volume
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="transactions" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Payment Methods */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Payment Methods Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }: any) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              >
                {paymentMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Transaction Status */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Transaction Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }: any) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Regional Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Regional Performance
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={regionData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis type="number" stroke="#6B7280" fontSize={12} />
            <YAxis dataKey="region" type="category" stroke="#6B7280" fontSize={12} width={100} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="transactions" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="revenue" fill="#10B981" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Performance Metrics Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Key Performance Indicators
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Metric</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Current</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Previous</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Change</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Trend</th>
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Average Transaction Value', current: '$325.50', previous: '$312.20', change: '+4.3%', trend: 'up' },
                { metric: 'Transaction Volume', current: '1,680', previous: '1,450', change: '+15.9%', trend: 'up' },
                { metric: 'Customer Acquisition Cost', current: '$45.20', previous: '$52.10', change: '-13.2%', trend: 'down' },
                { metric: 'Customer Lifetime Value', current: '$2,840', previous: '$2,650', change: '+7.2%', trend: 'up' },
                { metric: 'Churn Rate', current: '2.1%', previous: '2.8%', change: '-25.0%', trend: 'down' },
              ].map((row, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{row.metric}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{row.current}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{row.previous}</td>
                  <td className={`py-3 px-4 font-medium ${row.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {row.change}
                  </td>
                  <td className="py-3 px-4">
                    {row.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
