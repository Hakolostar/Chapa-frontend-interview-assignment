import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockApiService } from '../../services/mockApiService';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import {
  Send,
  ArrowLeft,
  User,
  CreditCard,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Mail,
  Phone,
  Users,
  History,
  Star
} from 'lucide-react';

interface SendMoneyFormData {
  recipientType: 'email' | 'phone';
  recipient: string;
  amount: string;
  description: string;
  sendMethod: 'instant' | 'standard';
}

interface SendMoneyPageProps {
  onNavigate?: (page: string) => void;
}

interface RecentRecipient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  lastSent: string;
  totalSent: number;
  frequency: number;
}

const SendMoneyPage: React.FC<SendMoneyPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<SendMoneyFormData>({
    recipientType: 'email',
    recipient: '',
    amount: '',
    description: '',
    sendMethod: 'instant'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [recentRecipients, setRecentRecipients] = useState<RecentRecipient[]>([]);

  // Mock recent recipients
  useEffect(() => {
    setRecentRecipients([
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+251911234567',
        lastSent: '2024-01-15',
        totalSent: 15500,
        frequency: 12
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+251912345678',
        lastSent: '2024-01-10',
        totalSent: 8900,
        frequency: 7
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        lastSent: '2024-01-08',
        totalSent: 3400,
        frequency: 3
      }
    ]);
  }, []);

  const handleInputChange = (field: keyof SendMoneyFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.recipient.trim()) {
      setError('Please enter recipient information');
      return false;
    }

    if (formData.recipientType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.recipient)) {
        setError('Please enter a valid email address');
        return false;
      }
    } else {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(formData.recipient.replace(/\s/g, ''))) {
        setError('Please enter a valid phone number');
        return false;
      }
    }

    const amount = parseFloat(formData.amount);
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return false;
    }

    if (amount > (user?.balance || 0)) {
      setError('Insufficient balance');
      return false;
    }

    if (amount > 50000) {
      setError('Maximum transfer limit is 50,000 ETB');
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (!validateForm()) return;
    setCurrentStep(2);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    setShowPin(true);
  };

  const handlePinSubmit = async () => {
    if (pin.length !== 4) {
      setError('Please enter a 4-digit PIN');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await mockApiService.createTransaction({
        userId: user!.id,
        amount: parseFloat(formData.amount),
        type: 'debit',
        description: formData.description || `Transfer to ${formData.recipient}`,
        status: 'pending'
      });

      setSuccess('Money sent successfully!');
      setCurrentStep(3);
      setShowPin(false);
      
      // Reset form after success
      setTimeout(() => {
        resetForm();
      }, 3000);

    } catch (error) {
      setError('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      recipientType: 'email',
      recipient: '',
      amount: '',
      description: '',
      sendMethod: 'instant'
    });
    setCurrentStep(1);
    setShowConfirmation(false);
    setShowPin(false);
    setPin('');
    setError('');
    setSuccess('');
  };

  const selectRecipient = (recipient: RecentRecipient) => {
    setFormData(prev => ({
      ...prev,
      recipient: recipient.email,
      recipientType: 'email'
    }));
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ETB'
    }).format(amount);
  };

  const calculateFee = (amount: number, method: string) => {
    if (method === 'instant') {
      return Math.max(amount * 0.015, 5); // 1.5% with minimum 5 ETB
    }
    return Math.max(amount * 0.01, 2); // 1% with minimum 2 ETB
  };

  const amount = parseFloat(formData.amount) || 0;
  const fee = calculateFee(amount, formData.sendMethod);
  const total = amount + fee;

  const handleBackToDashboard = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  if (success && currentStep === 3) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={resetForm}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Send Another</span>
          </button>
        </div>

        <Card className="text-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Transfer Successful!</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {formatAmount(amount)} has been sent to {formData.recipient}
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 w-full max-w-md">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium">{formatAmount(amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fee:</span>
                  <span className="font-medium">{formatAmount(fee)}</span>
                </div>
                <div className="border-t dark:border-gray-600 pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{formatAmount(total)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={resetForm}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Send More Money
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={handleBackToDashboard}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Send Money</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <DollarSign className="w-4 h-4" />
          <span>Available: {formatAmount(user?.balance || 0)}</span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= step
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              {step}
            </div>
            {step < 3 && (
              <div className={`w-12 h-0.5 ${
                currentStep > step ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card title="Transfer Details">
            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-6">
              {/* Recipient Type Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Send To
                </label>
                <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 p-1 bg-gray-50 dark:bg-gray-700">
                  <button
                    type="button"
                    onClick={() => handleInputChange('recipientType', 'email')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                      formData.recipientType === 'email'
                        ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('recipientType', 'phone')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                      formData.recipientType === 'phone'
                        ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>Phone</span>
                  </button>
                </div>
              </div>

              {/* Recipient Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {formData.recipientType === 'email' ? 'Email Address' : 'Phone Number'}
                </label>
                <input
                  type={formData.recipientType === 'email' ? 'email' : 'tel'}
                  value={formData.recipient}
                  onChange={(e) => handleInputChange('recipient', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder={formData.recipientType === 'email' ? 'recipient@example.com' : '+251 9XX XXX XXX'}
                />
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount (ETB)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 pl-12"
                    placeholder="0.00"
                    step="0.01"
                    min="1"
                    max="50000"
                  />
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Daily limit: 50,000 ETB
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="What's this for?"
                  maxLength={100}
                />
              </div>

              {/* Send Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Transfer Speed
                </label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      name="sendMethod"
                      value="instant"
                      checked={formData.sendMethod === 'instant'}
                      onChange={(e) => handleInputChange('sendMethod', e.target.value)}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">Instant Transfer</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">1.5% fee</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Arrives within minutes</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      name="sendMethod"
                      value="standard"
                      checked={formData.sendMethod === 'standard'}
                      onChange={(e) => handleInputChange('sendMethod', e.target.value)}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">Standard Transfer</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">1% fee</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Arrives in 1-2 hours</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleContinue}
                disabled={!formData.recipient || !formData.amount}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Continue</span>
              </button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Transfer Summary */}
          {amount > 0 && (
            <Card title="Transfer Summary">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                  <span className="font-medium">{formatAmount(amount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Fee:</span>
                  <span className="font-medium">{formatAmount(fee)}</span>
                </div>
                <div className="border-t dark:border-gray-600 pt-3 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{formatAmount(total)}</span>
                </div>
              </div>
            </Card>
          )}

          {/* Recent Recipients */}
          <Card title="Recent Recipients">
            <div className="space-y-3">
              {recentRecipients.map((recipient) => (
                <button
                  key={recipient.id}
                  onClick={() => selectRecipient(recipient)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">
                      {recipient.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{recipient.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{recipient.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{recipient.frequency}x</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Transfer
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">To:</span>
                <span className="font-medium">{formData.recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                <span className="font-medium">{formatAmount(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Fee:</span>
                <span className="font-medium">{formatAmount(fee)}</span>
              </div>
              <div className="border-t dark:border-gray-600 pt-3 flex justify-between font-bold">
                <span>Total:</span>
                <span>{formatAmount(total)}</span>
              </div>
              {formData.description && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Note:</span>
                  <span className="font-medium">{formData.description}</span>
                </div>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PIN Modal */}
      {showPin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Enter Your PIN
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
              Please enter your 4-digit PIN to complete the transfer
            </p>
            <div className="mb-6">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value.slice(0, 4))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-center text-2xl tracking-widest"
                placeholder="••••"
                maxLength={4}
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPin(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePinSubmit}
                disabled={isLoading || pin.length !== 4}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendMoneyPage;
