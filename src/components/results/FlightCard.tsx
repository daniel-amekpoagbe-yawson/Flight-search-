import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import BookingModal from './BookingModal';
import { bookFlight } from '../../service/mockBooking';
import type { ProcessedFlight } from '../../types/flight';
import {formatDuration, formatPrice, getTimeFromISO } from '../../utils/Helper';

interface FlightCardProps {
  flight: ProcessedFlight;
  dictionaries?: { carriers?: Record<string, string> };
  isBestDeal?: boolean;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, dictionaries, isBestDeal = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const itinerary = flight.itineraries[0];
  const firstSegment = itinerary.segments[0];
  const lastSegment = itinerary.segments[itinerary.segments.length - 1];

  const airlineName = dictionaries?.carriers?.[flight.mainAirline] || flight.mainAirline;

  // Get layover information
  const getLayoverInfo = () => {
    if (flight.totalStops === 0) return null;
    
    const layovers = [];
    for (let i = 0; i < itinerary.segments.length - 1; i++) {
      const currentSegment = itinerary.segments[i];
      const nextSegment = itinerary.segments[i + 1];
      
      const arrivalTime = new Date(currentSegment.arrival.at);
      const departureTime = new Date(nextSegment.departure.at);
      const layoverMinutes = Math.round((departureTime.getTime() - arrivalTime.getTime()) / 60000);
      
      layovers.push({
        airport: currentSegment.arrival.iataCode,
        duration: layoverMinutes,
      });
    }
    return layovers;
  };

  const layovers = getLayoverInfo();

  return (
    <>  
    <Card hover className="mb-5 relative overflow-hidden">
      {/* Best Deal Badge */}
      {isBestDeal && (
        <div className="absolute top-0 right-0 bg-gradient-to-br from-amber-400 to-amber-500 text-black px-2 py-1.5 rounded-bl-xl font-mono text-xs shadow-lg">
          ⭐ Best Deal
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Flight details - Left side */}
        <div className="lg:col-span-8 space-y-5">
          {/* Airline header */}
          <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
            <div className="w-8 h-8 bg-gradient-to-br from-black to-slate-700 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-xs font-normal text-white">
                {flight.mainAirline}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{airlineName}</span>
            <span className={`ml-auto text-xs font-semibold px-3 py-1 rounded-full ${
              flight.totalStops === 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {flight.totalStops === 0 ? '✓ Non-stop' : `${flight.totalStops} stop${flight.totalStops > 1 ? 's' : ''}`}
            </span>
          </div>

          {/* Route information */}
          <div className="flex items-center justify-between">
            {/* Departure */}
            <div className="flex-shrink-0">
              <div className="text-base font-medium text-gray-900">{getTimeFromISO(firstSegment.departure.at)}</div>
              <div className="text-sm font-normal text-gray-600 mt-1">{firstSegment.departure.iataCode}</div>
            </div>

            {/* Duration and route line */}
            <div className="flex-grow mx-6 flex flex-col items-center">
              <div className="text-sm font-normal text-gray-700 mb-2">{formatDuration(flight.totalDuration)}</div>
              <div className="flex items-center justify-center w-full relative">
                <div className="h-0.5 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 flex-grow" />
                <div className="mx-3 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-black shadow-md" />
                </div>
              </div>
            </div>

            {/* Arrival */}
            <div className="flex-shrink-0 text-right">
              <div className="text-base font-medium text-gray-900">{getTimeFromISO(lastSegment.arrival.at)}</div>
              <div className="text-sm font-normal text-gray-600 mt-1">{lastSegment.arrival.iataCode}</div>
            </div>
          </div>

          {/* Layover Information */}
          {layovers && layovers.length > 0 && (
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Layover Details</p>
              <div className="space-y-2">
                {layovers.map((layover, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-normal">{layover.airport}</span>
                  <span className="text-gray-600 font-medium">{Math.floor(layover.duration / 60)}h {layover.duration % 60}m</span>
                </div>
              ))}
              </div>
            </div>
          )}
        </div>

        {/* Price and CTA - Right side */}
        <div className="lg:col-span-4 flex flex-col justify-between items-end gap-4">
          <div className="text-right mt-2">
            <div className="text-lg font-semibold text-gray-900">
              {formatPrice(flight.priceNumeric, flight.price.currency)}
            </div>
            <div className="text-sm font-normal text-gray-600 mt-1">per person</div>
          </div>
          
          <div className="w-full lg:w-auto">
            {bookingRef ? (
              <div className="bg-green-50 border border-green-100 text-green-800 px-4 py-2 rounded-md text-sm font-medium">Booked — Ref: {bookingRef}</div>
            ) : (
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => { setModalOpen(true); setBookingError(null); }}
                disabled={bookingLoading}
              >
                {bookingLoading ? 'Processing...' : 'Book Flight'}
              </Button>
            )}

            {bookingError && <div className="text-sm text-red-700 mt-2">{bookingError}</div>}
          </div>
        </div>
      </div>
    </Card>

      <BookingModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        flightSummary={`${firstSegment.departure.iataCode} → ${lastSegment.arrival.iataCode} • ${formatPrice(flight.priceNumeric, flight.price.currency)}`}
        onConfirm={async (payment) => {
          setBookingLoading(true);
          setBookingError(null);
          try {
            const res = await bookFlight(flight, payment as any);
            setBookingRef(res.bookingRef || null);
            setModalOpen(false);
          } catch (err: any) {
            setBookingError(err?.message || 'Booking failed');
            throw err;
          } finally {
            setBookingLoading(false);
          }
        }}
      />
    </>

  );

};