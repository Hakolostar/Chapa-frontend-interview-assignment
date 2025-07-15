import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockApiService } from '../../services/mockApiService';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import {
  ArrowLeft,
  Mail,
  DollarSign,
  MessageSquare,
  Send,
  Copy,
  Share2,
  Link,
  CheckCircle
} from 'lucide-react';

interface RequestMoneyPageProps {
  onNavigate?: (page: string) => void;
}

const RequestMoneyPage: React.FC<RequestMoneyPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [requesterEmail, setRequesterEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requestGenerated, setRequestGenerated] = useState(false);
  const [requestLink, setRequestLink] = useState('');
  const [shareMethod, setShareMethod] = useState<'email' | 'link'>('email');

  const handleRequestMoney = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !requesterEmail || !description) return;

    setIsLoading(true);
    try {
      // Create money request using the API service
      const response = await mockApiService.createMoneyRequest({
        requesterId: user!.id,
        requesterEmail,
        amount: parseFloat(amount),
        description,
        dueDate: '',
        isUrgent: false
      });

      setRequestLink(response.url);
      setRequestGenerated(true);
      
    } catch (error) {
      console.error('Error creating money request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ETB'
    }).format(amount);
  };

  const handleBackToDashboard = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  const handleNewRequest = () => {
    setAmount('');
    setRequesterEmail('');
    setDescription('');
    setRequestGenerated(false);
    setRequestLink('');
  };

  if (requestGenerated) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Success State */}
        <Card className="text-center">
          <div className="py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Request Created Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your money request for {formatAmount(parseFloat(amount))} has been created.
            </p>

            {/* Request Details */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Request Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatAmount(parseFloat(amount))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">From:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{requesterEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Description:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{description}</span>
                </div>
              </div>
            </div>

            {/* Share Options */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Share Request</h3>
              
              {/* Share Method Tabs */}
              <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setShareMethod('email')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    shareMethod === 'email'
                      ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </button>
                <button
                  onClick={() => setShareMethod('link')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    shareMethod === 'link'
                      ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Link className="w-4 h-4 inline mr-2" />
                  Link
                </button>
              </div>

              {/* Share Content */}
              {shareMethod === 'email' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Email will be sent to:</p>
                    <p className="font-medium text-gray-900 dark:text-white">{requesterEmail}</p>
                  </div>
                  <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send Email Request</span>
                  </button>
                </div>
              )}

              {shareMethod === 'link' && (
                <div className="space-y-4">
                  <div className="flex">
                    <input
                      type="text"
                      value={requestLink}
                      readOnly
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(requestLink)}
                      className="px-4 py-3 bg-gray-200 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                  <button
                    onClick={() => copyToClipboard(requestLink)}
                    className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Copy Link</span>
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-4 mt-8">
              <button
                onClick={handleNewRequest}
                className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Create New Request
              </button>
              <button
                onClick={handleBackToDashboard}
                className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleBackToDashboard}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Request Money</h1>
          <p className="text-gray-600 dark:text-gray-400">Request payment from someone</p>
        </div>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Request Form */}
        <div className="lg:col-span-2">
          <Card title="Create Money Request">
            <form onSubmit={handleRequestMoney} className="space-y-6">
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Request Amount *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    min="0.01"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Requester Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Request From (Email) *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={requesterEmail}
                    onChange={(e) => setRequesterEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is this payment for?"
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !amount || !requesterEmail || !description}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span>{isLoading ? 'Creating Request...' : 'Create Request'}</span>
              </button>
            </form>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* How it Works */}
          <Card title="How it Works">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Enter Details</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Specify amount and recipient</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Send Request</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Share via email or link</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Receive Payment</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Get notified when paid</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Requests */}
          <Card title="Recent Requests">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">5,000 ETB</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Lunch split</p>
                </div>
                <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full">
                  Pending
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">2,500 ETB</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Coffee meetup</p>
                </div>
                <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full">
                  Paid
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestMoneyPage;
