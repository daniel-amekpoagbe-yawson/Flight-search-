/**
 * Mock booking service
 * Simulates network latency and returns a booking reference on success
 */
export interface MockBookingPayment {
  name: string;
  cardNumber: string;
}

export interface MockBookingResult {
  success: boolean;
  bookingRef?: string;
}

export const bookFlight = async (_flight: any, payment: MockBookingPayment): Promise<MockBookingResult> => {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 1200));

  // Very simple validation for mock purposes
  if (!payment.name || !payment.cardNumber) {
    throw new Error('Invalid payment details');
  }

  // Simulate occasional failure
  const fail = Math.random() < 0.12;
  if (fail) {
    throw new Error('Payment was declined (mock)');
  }

  const bookingRef = `BK${Date.now().toString(36).slice(-8).toUpperCase()}`;
  return { success: true, bookingRef };
};

export default { bookFlight };
