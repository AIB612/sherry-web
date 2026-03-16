'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import Footer from 'components/layout/footer';

interface RechargeStep {
  id: string;
  label: string;
  status: 'pending' | 'loading' | 'completed' | 'failed';
}

export default function RechargePage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;

  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');
  const [message, setMessage] = useState('Processing payment...');
  const [socket, setSocket] = useState<Socket | null>(null);

  const steps: RechargeStep[] = [
    { id: '1', label: 'Payment Confirmed', status: 'loading' },
    { id: '2', label: 'Account Verified', status: 'pending' },
    { id: '3', label: 'Waiting for Admin', status: 'pending' },
    { id: '4', label: 'License Activated', status: 'pending' },
    { id: '5', label: 'Confirmation Sent', status: 'pending' },
  ];

  const [stepsState, setStepsState] = useState<RechargeStep[]>(steps);

  useEffect(() => {
    if (!orderId) {
      router.push('/');
      return;
    }

    // Connect to WebSocket
    const newSocket = io('http://localhost:3001');

    newSocket.on('connect', () => {
      console.log('WebSocket connected');
      newSocket.emit('join-order', orderId);
    });

    // Listen for status updates
    newSocket.on('status-change', (data: any) => {
      console.log('Status update:', data);

      if (data.status === 'processing') {
        setStepsState(prev => prev.map((s, i) =>
          i === 0 ? { ...s, status: 'completed' } :
          i === 1 ? { ...s, status: 'completed' } :
          i === 2 ? { ...s, status: 'loading' } : s
        ));
        setStatus('processing');
        setMessage('Admin is processing your order...');
      } else if (data.status === 'completed') {
        setStepsState(prev => prev.map((s) => ({ ...s, status: 'completed' })));
        setStatus('completed');
        setMessage('Successfully activated!');

        // Redirect to success page
        setTimeout(() => {
          router.push(`/success?orderId=${orderId}`);
        }, 2000);
      } else if (data.status === 'failed') {
        setStatus('failed');
        setMessage('Activation failed');
      }
    });

    setSocket(newSocket);

    // Initial steps simulation
    const processInitialSteps = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStepsState(prev => prev.map((s, i) =>
        i === 0 ? { ...s, status: 'completed' } : s
      ));
      setMessage('Verifying account...');

      await new Promise(resolve => setTimeout(resolve, 1500));
      setStepsState(prev => prev.map((s, i) =>
        i === 1 ? { ...s, status: 'completed' } :
        i === 2 ? { ...s, status: 'loading' } : s
      ));
      setMessage('Waiting for admin processing...');
      setStatus('processing');
    };

    processInitialSteps();

    return () => {
      newSocket.emit('leave-order', orderId);
      newSocket.disconnect();
    };
  }, [orderId, router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="border-2 rounded-lg p-8">
          {/* Animated Icon */}
          <div className="flex justify-center mb-8">
            {status === 'completed' ? (
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl">
                ✓
              </div>
            ) : (
              <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-2">
            {status === 'completed' ? '✓ Completed' : '⏳ Processing'}
          </h2>

          <p className="text-center text-sm text-gray-600 mb-6">
            Order ID: <span className="font-mono">{orderId}</span>
          </p>

          {/* Progress Steps */}
          <div className="space-y-3 mb-6">
            {stepsState.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {step.status === 'completed' ? (
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                  ) : step.status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                  )}
                </div>

                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    step.status === 'completed' || step.status === 'loading' ? 'text-black' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Current Message */}
          <div className="text-center py-4 bg-gray-50 rounded-lg border">
            <p className="text-sm font-medium">{message}</p>
            {status === 'processing' && (
              <p className="text-xs text-gray-500 mt-2">
                This may take 1-5 minutes
              </p>
            )}
          </div>

          {/* Pulsing Dots */}
          {(status === 'pending' || status === 'processing') && (
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-black rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          )}

          <p className="text-xs text-center text-gray-500 mt-6">
            ⚠️ Please do not close this page
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
