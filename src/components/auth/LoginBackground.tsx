import React from 'react';
import { Wallet, Coins, CreditCard, DollarSign, TrendingUp } from 'lucide-react';

const LoginBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-primary-100 to-green-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary-200/30 to-green-300/40 dark:from-transparent dark:via-primary-800/20 dark:to-green-700/30 animate-pulse" 
           style={{ animationDuration: '6s' }} />
      
      {/* Secondary animated overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-bl from-green-100/20 via-transparent to-primary-300/20 dark:from-green-800/10 dark:via-transparent dark:to-primary-700/10 animate-pulse" 
           style={{ animationDuration: '8s', animationDelay: '2s' }} />
      
      {/* 45-degree rotated elements container */}
      <div className="absolute inset-0 transform rotate-45 scale-150 origin-center opacity-12 dark:opacity-6">
        {/* Large Chapa logo watermarks - better spaced */}
        <div className="absolute -top-20 -left-32">
          <svg width="140" height="140" viewBox="0 0 43 63" className="text-primary-600 fill-current">
            <path fill="currentColor" opacity="0.4" d="M11.8,26.2h23.5l0,0l0,0c0,3.6-2.9,6.5-6.5,6.5c0,0,0,0,0,0h-17c-1.8,0-3.3-1.5-3.3-3.3l0,0l0,0C8.6,27.7,10,26.2,11.8,26.2L11.8,26.2L11.8,26.2z"/>
            <path fill="currentColor" opacity="0.4" d="M35.1,17.6l-4.7,6.5h6.2c3.6,0,6.5-2.9,6.5-6.5c0,0,0,0,0,0H35.1z"/>
            <path fill="currentColor" opacity="0.4" d="M22.4,24l4.6-6.4H11.9C16.3,17.6,20.4,20.1,22.4,24z"/>
            <path fill="currentColor" opacity="0.5" d="M27.2,17.4L27,17.6L22.4,24l0,0.1h-0.1l-1.5,2.1l-4.9,6.7c-1.9,2.2-5.3,2.5-7.5,0.6S5.9,28.2,7.8,26c1-1.1,2.4-1.8,3.9-1.9h10.7l0.1-0.1c-2-3.9-6.1-6.4-10.5-6.4l0,0h-0.7C4.6,18-0.4,23.6,0,30.1s6,11.5,12.5,11.1c3.4-0.2,6.6-1.9,8.6-4.5l0.4-0.6l0,0l7.2-9.9l1.5-2.1l4.7-6.5l1.2-1.6C33.4,13.9,29.3,14.5,27.2,17.4z"/>
          </svg>
        </div>
        
        <div className="absolute top-40 -right-40">
          <svg width="110" height="110" viewBox="0 0 43 63" className="text-green-600 fill-current">
            <path fill="currentColor" opacity="0.3" d="M11.8,26.2h23.5l0,0l0,0c0,3.6-2.9,6.5-6.5,6.5c0,0,0,0,0,0h-17c-1.8,0-3.3-1.5-3.3-3.3l0,0l0,0C8.6,27.7,10,26.2,11.8,26.2L11.8,26.2L11.8,26.2z"/>
            <path fill="currentColor" opacity="0.3" d="M35.1,17.6l-4.7,6.5h6.2c3.6,0,6.5-2.9,6.5-6.5c0,0,0,0,0,0H35.1z"/>
            <path fill="currentColor" opacity="0.3" d="M22.4,24l4.6-6.4H11.9C16.3,17.6,20.4,20.1,22.4,24z"/>
            <path fill="currentColor" opacity="0.4" d="M27.2,17.4L27,17.6L22.4,24l0,0.1h-0.1l-1.5,2.1l-4.9,6.7c-1.9,2.2-5.3,2.5-7.5,0.6S5.9,28.2,7.8,26c1-1.1,2.4-1.8,3.9-1.9h10.7l0.1-0.1c-2-3.9-6.1-6.4-10.5-6.4l0,0h-0.7C4.6,18-0.4,23.6,0,30.1s6,11.5,12.5,11.1c3.4-0.2,6.6-1.9,8.6-4.5l0.4-0.6l0,0l7.2-9.9l1.5-2.1l4.7-6.5l1.2-1.6C33.4,13.9,29.3,14.5,27.2,17.4z"/>
          </svg>
        </div>
        
        <div className="absolute -bottom-30 -left-35">
          <svg width="90" height="90" viewBox="0 0 43 63" className="text-primary-500 fill-current">
            <path fill="currentColor" opacity="0.3" d="M27.2,17.4L27,17.6L22.4,24l0,0.1h-0.1l-1.5,2.1l-4.9,6.7c-1.9,2.2-5.3,2.5-7.5,0.6S5.9,28.2,7.8,26c1-1.1,2.4-1.8,3.9-1.9h10.7l0.1-0.1c-2-3.9-6.1-6.4-10.5-6.4l0,0h-0.7C4.6,18-0.4,23.6,0,30.1s6,11.5,12.5,11.1c3.4-0.2,6.6-1.9,8.6-4.5l0.4-0.6l0,0l7.2-9.9l1.5-2.1l4.7-6.5l1.2-1.6C33.4,13.9,29.3,14.5,27.2,17.4z"/>
          </svg>
        </div>
        
        <div className="absolute -bottom-25 -right-30">
          <svg width="100" height="100" viewBox="0 0 43 63" className="text-primary-400 fill-current">
            <path fill="currentColor" opacity="0.35" d="M27.2,17.4L27,17.6L22.4,24l0,0.1h-0.1l-1.5,2.1l-4.9,6.7c-1.9,2.2-5.3,2.5-7.5,0.6S5.9,28.2,7.8,26c1-1.1,2.4-1.8,3.9-1.9h10.7l0.1-0.1c-2-3.9-6.1-6.4-10.5-6.4l0,0h-0.7C4.6,18-0.4,23.6,0,30.1s6,11.5,12.5,11.1c3.4-0.2,6.6-1.9,8.6-4.5l0.4-0.6l0,0l7.2-9.9l1.5-2.1l4.7-6.5l1.2-1.6C33.4,13.9,29.3,14.5,27.2,17.4z"/>
          </svg>
        </div>
      </div>
      
      {/* Financial icons scattered at 45-degree angle - better spaced */}
      <div className="absolute inset-0 transform rotate-45 scale-110 origin-center">
        {/* Wallet icons - strategic positioning */}
        <div className="absolute top-8 left-16 opacity-10 dark:opacity-5 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0s' }}>
          <Wallet className="w-16 h-16 text-primary-400" />
        </div>
        
        <div className="absolute top-64 right-8 opacity-8 dark:opacity-4 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
          <Wallet className="w-12 h-12 text-green-500" />
        </div>
        
        <div className="absolute bottom-64 left-8 opacity-9 dark:opacity-5 animate-bounce" style={{ animationDuration: '6s', animationDelay: '2s' }}>
          <Wallet className="w-14 h-14 text-primary-500" />
        </div>
        
        <div className="absolute bottom-8 right-16 opacity-7 dark:opacity-4 animate-bounce" style={{ animationDuration: '7s', animationDelay: '3s' }}>
          <Wallet className="w-13 h-13 text-green-600" />
        </div>
        
        {/* Coin icons - corners and edges */}
        <div className="absolute top-32 right-32 opacity-10 dark:opacity-5 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
          <Coins className="w-18 h-18 text-yellow-500" />
        </div>
        
        <div className="absolute bottom-32 left-32 opacity-8 dark:opacity-4 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1.5s' }}>
          <Coins className="w-15 h-15 text-yellow-600" />
        </div>
        
        <div className="absolute top-80 left-4 opacity-9 dark:opacity-5 animate-pulse" style={{ animationDuration: '5s', animationDelay: '2.5s' }}>
          <Coins className="w-12 h-12 text-yellow-400" />
        </div>
        
        <div className="absolute bottom-80 right-4 opacity-7 dark:opacity-4 animate-pulse" style={{ animationDuration: '6s', animationDelay: '3.5s' }}>
          <Coins className="w-14 h-14 text-yellow-500" />
        </div>
        
        {/* Credit card icons - middle areas */}
        <div className="absolute top-48 left-48 opacity-8 dark:opacity-4 animate-bounce" style={{ animationDuration: '7s', animationDelay: '1s' }}>
          <CreditCard className="w-16 h-16 text-blue-500" />
        </div>
        
        <div className="absolute bottom-48 right-48 opacity-10 dark:opacity-5 animate-bounce" style={{ animationDuration: '6s', animationDelay: '3s' }}>
          <CreditCard className="w-14 h-14 text-blue-600" />
        </div>
        
        <div className="absolute top-16 right-64 opacity-7 dark:opacity-4 animate-bounce" style={{ animationDuration: '8s', animationDelay: '5s' }}>
          <CreditCard className="w-12 h-12 text-blue-400" />
        </div>
        
        <div className="absolute bottom-16 left-64 opacity-9 dark:opacity-5 animate-bounce" style={{ animationDuration: '7s', animationDelay: '2s' }}>
          <CreditCard className="w-15 h-15 text-blue-700" />
        </div>
        
        {/* Dollar signs - scattered evenly */}
        <div className="absolute top-96 left-24 opacity-9 dark:opacity-5 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.8s' }}>
          <DollarSign className="w-14 h-14 text-green-600" />
        </div>
        
        <div className="absolute top-24 right-96 opacity-8 dark:opacity-4 animate-pulse" style={{ animationDuration: '5s', animationDelay: '2.2s' }}>
          <DollarSign className="w-11 h-11 text-green-500" />
        </div>
        
        <div className="absolute bottom-96 right-24 opacity-7 dark:opacity-4 animate-pulse" style={{ animationDuration: '6s', animationDelay: '4.2s' }}>
          <DollarSign className="w-13 h-13 text-green-700" />
        </div>
        
        <div className="absolute bottom-24 left-96 opacity-10 dark:opacity-5 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.8s' }}>
          <DollarSign className="w-10 h-10 text-green-400" />
        </div>
        
        {/* Trending up icons - corners */}
        <div className="absolute top-72 left-72 opacity-7 dark:opacity-4 animate-bounce" style={{ animationDuration: '8s', animationDelay: '1.8s' }}>
          <TrendingUp className="w-13 h-13 text-primary-600" />
        </div>
        
        <div className="absolute top-56 right-56 opacity-8 dark:opacity-4 animate-bounce" style={{ animationDuration: '7s', animationDelay: '3.5s' }}>
          <TrendingUp className="w-15 h-15 text-primary-500" />
        </div>
        
        <div className="absolute bottom-72 left-56 opacity-6 dark:opacity-3 animate-bounce" style={{ animationDuration: '9s', animationDelay: '5.5s' }}>
          <TrendingUp className="w-12 h-12 text-primary-700" />
        </div>
        
        <div className="absolute bottom-56 right-72 opacity-9 dark:opacity-5 animate-bounce" style={{ animationDuration: '6s', animationDelay: '0.5s' }}>
          <TrendingUp className="w-16 h-16 text-primary-400" />
        </div>
      </div>
      
      {/* Floating particles effect - more numerous */}
      <div className="absolute inset-0">
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full opacity-20 dark:opacity-10 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Non-rotated background elements - visible around form with better spacing */}
      <div className="absolute inset-0">
        {/* Left side elements - spaced vertically */}
        <div className="absolute top-20 left-8 opacity-15 dark:opacity-8 animate-pulse" style={{ animationDuration: '4s' }}>
          <Wallet className="w-10 h-10 text-primary-500" />
        </div>
        
        <div className="absolute top-40 left-12 opacity-12 dark:opacity-6 animate-bounce" style={{ animationDuration: '6s', animationDelay: '1s' }}>
          <Coins className="w-12 h-12 text-yellow-500" />
        </div>
        
        <div className="absolute top-64 left-6 opacity-10 dark:opacity-5 animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}>
          <DollarSign className="w-9 h-9 text-green-600" />
        </div>
        
        <div className="absolute bottom-32 left-10 opacity-13 dark:opacity-7 animate-bounce" style={{ animationDuration: '7s', animationDelay: '3s' }}>
          <TrendingUp className="w-11 h-11 text-primary-600" />
        </div>
        
        {/* Right side elements - mirrored spacing */}
        <div className="absolute top-24 right-8 opacity-14 dark:opacity-7 animate-pulse" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>
          <CreditCard className="w-11 h-11 text-blue-500" />
        </div>
        
        <div className="absolute top-48 right-12 opacity-11 dark:opacity-6 animate-bounce" style={{ animationDuration: '6s', animationDelay: '1.5s' }}>
          <Wallet className="w-10 h-10 text-green-500" />
        </div>
        
        <div className="absolute top-72 right-6 opacity-12 dark:opacity-6 animate-pulse" style={{ animationDuration: '4s', animationDelay: '2.5s' }}>
          <Coins className="w-12 h-12 text-yellow-600" />
        </div>
        
        <div className="absolute bottom-28 right-10 opacity-10 dark:opacity-5 animate-bounce" style={{ animationDuration: '8s', animationDelay: '4s' }}>
          <DollarSign className="w-10 h-10 text-green-500" />
        </div>
        
        {/* Top elements - horizontal spacing */}
        <div className="absolute top-8 left-32 opacity-8 dark:opacity-4 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}>
          <TrendingUp className="w-9 h-9 text-primary-500" />
        </div>
        
        <div className="absolute top-12 left-56 opacity-9 dark:opacity-5 animate-bounce" style={{ animationDuration: '7s', animationDelay: '2s' }}>
          <Coins className="w-10 h-10 text-yellow-400" />
        </div>
        
        <div className="absolute top-6 right-32 opacity-11 dark:opacity-6 animate-pulse" style={{ animationDuration: '5s', animationDelay: '3s' }}>
          <Wallet className="w-9 h-9 text-primary-400" />
        </div>
        
        <div className="absolute top-10 right-56 opacity-10 dark:opacity-5 animate-bounce" style={{ animationDuration: '6s', animationDelay: '4s' }}>
          <CreditCard className="w-9 h-9 text-blue-600" />
        </div>
        
        {/* Bottom elements - horizontal spacing */}
        <div className="absolute bottom-8 left-40 opacity-12 dark:opacity-6 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1.5s' }}>
          <DollarSign className="w-10 h-10 text-green-600" />
        </div>
        
        <div className="absolute bottom-12 left-64 opacity-9 dark:opacity-5 animate-bounce" style={{ animationDuration: '7s', animationDelay: '2.5s' }}>
          <TrendingUp className="w-9 h-9 text-primary-500" />
        </div>
        
        <div className="absolute bottom-6 right-40 opacity-11 dark:opacity-6 animate-pulse" style={{ animationDuration: '6s', animationDelay: '3.5s' }}>
          <Coins className="w-10 h-10 text-yellow-500" />
        </div>
        
        <div className="absolute bottom-10 right-64 opacity-8 dark:opacity-4 animate-bounce" style={{ animationDuration: '8s', animationDelay: '4.5s' }}>
          <Wallet className="w-9 h-9 text-green-600" />
        </div>
      </div>
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5 dark:opacity-2"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 198, 63, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 198, 63, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

export default LoginBackground;
