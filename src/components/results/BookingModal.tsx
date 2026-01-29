import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';


interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (payment: { name: string; cardNumber: string }) => Promise<void>;
  flightSummary: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ open, onClose, onConfirm, flightSummary }) => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onConfirm({ name, cardNumber });
    } catch (err: any) {
      setError(err?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <Card className="relative z-10 w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-2">Confirm Booking</h3>
        <p className="text-sm text-gray-600 mb-4">{flightSummary}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-700">Full name</label>
            <input
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700">Card number (mock)</label>
            <input
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="4242 4242 4242 4242"
              required
            />
          </div>

          {error && <div className="text-sm text-red-700">{error}</div>}

          <div className="flex items-center gap-3 justify-end">
            <Button type="button" variant="secondary" onClick={onClose} disabled={submitting}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={submitting}>{submitting ? 'Processing...' : 'Confirm & Pay'}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default BookingModal;
