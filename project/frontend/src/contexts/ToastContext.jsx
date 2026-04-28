import { createContext, useCallback, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { C, PRIMARY } from '../theme';

export const ToastContext = createContext(null);

const TOAST_STYLES = {
  success: { icon: CheckCircle2, bg: '#f0fdf4', border: '#bbf7d0', color: '#166534' },
  error: { icon: AlertCircle, bg: '#fef2f2', border: '#fecaca', color: '#991b1b' },
  info: { icon: Info, bg: '#eff6ff', border: '#bfdbfe', color: PRIMARY },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(({ type = 'info', message, duration = 3500 }) => {
    if (!message) return;
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, type, message }]);
    window.setTimeout(() => removeToast(id), duration);
  }, [removeToast]);

  const value = useMemo(() => ({
    showToast,
    success: (message) => showToast({ type: 'success', message }),
    error: (message) => showToast({ type: 'error', message }),
    info: (message) => showToast({ type: 'info', message }),
  }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div style={{ position: 'fixed', top: 76, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10, width: 'min(360px, calc(100vw - 40px))' }}>
        {toasts.map((toast) => {
          const style = TOAST_STYLES[toast.type] || TOAST_STYLES.info;
          const Icon = style.icon;

          return (
            <div
              key={toast.id}
              role="status"
              style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: style.bg, border: `1px solid ${style.border}`, borderRadius: 10, padding: '12px 14px', color: style.color, boxShadow: '0 12px 30px rgba(15,23,42,0.12)' }}
            >
              <Icon size={17} style={{ flexShrink: 0, marginTop: 1 }} />
              <div style={{ flex: 1, fontSize: 13, lineHeight: 1.45, color: C.body }}>{toast.message}</div>
              <button
                type="button"
                aria-label="Zatvori obavijest"
                onClick={() => removeToast(toast.id)}
                style={{ border: 'none', background: 'transparent', color: style.color, cursor: 'pointer', padding: 0, lineHeight: 0 }}
              >
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
