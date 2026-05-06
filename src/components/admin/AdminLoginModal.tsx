import { useState, useRef, useEffect, type FormEvent } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { requestOtp, verifyOtp } from '../../services/authService';

interface Props {
  onClose: () => void;
  onLoginSuccess: (role: string) => void;
}

type Step = 'email' | 'code';

export default function AdminLoginModal({ onClose, onLoginSuccess }: Props) {
  const { login } = useAuth();
  const [step, setStep]         = useState<Step>('email');
  const [email, setEmail]       = useState('');
  const [code, setCode]         = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, [step]);

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await requestOtp(email.trim());
      setStep('code');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCodeSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await verifyOtp(email.trim(), code.trim(), remember);
      login(result.id, result.email, result.role, result.token, remember, result.expiresAt);
      onLoginSuccess(result.role);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid or expired code');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <h2 className="text-base font-medium text-stone-900 tracking-wide">Admin Sign In</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5">
          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <p className="text-sm text-stone-500">Enter your email to receive a one-time sign-in code.</p>
              <div>
                <label htmlFor="auth-email" className="block text-xs font-medium text-stone-600 uppercase tracking-wide mb-1.5">
                  Email address
                </label>
                <input
                  ref={inputRef}
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-stone-500"
                  placeholder="you@example.com"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-stone-800 text-white py-2 rounded text-sm font-medium hover:bg-stone-900 disabled:opacity-50 transition-colors"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Sending…' : 'Send Code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <p className="text-sm text-stone-500">
                Enter the 6-digit code sent to <strong>{email}</strong>. Expires in {10} minutes.
              </p>
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2.5 py-2">
                Check your <strong>Spam</strong> folder if it doesn't arrive.
              </p>
              <div>
                <label htmlFor="auth-code" className="block text-xs font-medium text-stone-600 uppercase tracking-wide mb-1.5">
                  Login code
                </label>
                <input
                  ref={inputRef}
                  id="auth-code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  required
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-center tracking-widest text-xl font-mono focus:outline-none focus:ring-1 focus:ring-stone-500"
                  placeholder="000000"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-stone-300"
                />
                <span className="text-sm text-stone-500">Remember this device</span>
              </label>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="w-full flex items-center justify-center gap-2 bg-stone-800 text-white py-2 rounded text-sm font-medium hover:bg-stone-900 disabled:opacity-50 transition-colors"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Verifying…' : 'Verify & Sign In'}
              </button>
              <button
                type="button"
                onClick={() => { setStep('email'); setCode(''); setError(''); }}
                className="w-full text-sm text-stone-400 hover:text-stone-600 transition-colors"
              >
                ← Use a different email
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
