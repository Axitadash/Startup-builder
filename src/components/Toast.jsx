import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useAuth();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.9rem 1.4rem',
      background: '#0f172a',
      border: '1px solid rgba(99, 102, 241, 0.4)',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(99, 102, 241, 0.25)',
      color: '#ffffff',
      fontSize: '0.95rem',
      fontWeight: '500',
      animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {type === 'success' && <CheckCircle2 size={20} color="#10b981" />}
      {type === 'error' && <AlertCircle size={20} color="#ef4444" />}
      {type === 'info' && <Info size={20} color="#3b82f6" />}
      <span>{message}</span>
    </div>
  );
}
