
// ============================================
// Search Parameters & Filters
// ============================================

export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  nonStop?: boolean;
  currencyCode?: string;
  maxResults?: number;
  page?: number;
}

export interface FilterState {
  priceRange: [number, number];
  stops: ('0' | '1' | '2+')[];
  airlines: string[];
  departureTimeRange: [number, number]; // Hours in 24h format (0-23)
  arrivalTimeRange: [number, number];
  duration: [number, number]; // Minutes
}

// ============================================
// Flight Data Structures
// ============================================

export interface FlightOffer {
  id: string;
  price: {
    total: string;
    currency: string;
    base: string;
    fees?: Array<{ amount: string; type: string }>;
  };
  itineraries: Itinerary[];
  validatingAirlineCodes: string[];
  numberOfBookableSeats: number;
  lastTicketingDate?: string;
}

export interface Itinerary {
  duration: string; // ISO 8601 duration format (PT2H30M)
  segments: Segment[];
}

export interface Segment {
  departure: LocationTime;
  arrival: LocationTime;
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  operating?: {
    carrierCode: string;
  };
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

export interface LocationTime {
  iataCode: string;
  terminal?: string;
  at: string; // ISO 8601 datetime
}

// ============================================
// Chart & Analytics Data
// ============================================

export interface PriceDataPoint {
  price: number;
  date: string;
  airline?: string;
  stops?: number;
}

export interface PriceTrend {
  current: PriceDataPoint[];
  filtered: PriceDataPoint[];
  lowest: number;
  highest: number;
  average: number;
}

// ============================================
// Airport & Location Data
// ============================================

export interface Airport {
  iataCode: string;
  name: string;
  cityName?: string;
  countryName?: string;
}

export interface AirportSearchResult {
  id: string;
  type: string;
  subType: string;
  name: string;
  detailedName: string;
  iataCode: string;
  address: {
    cityName: string;
    countryName: string;
  };
}

// ============================================
// API Response Types
// ============================================

export interface AmadeusAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface FlightOffersResponse {
  data: FlightOffer[];
  dictionaries?: {
    carriers?: Record<string, string>;
    aircraft?: Record<string, string>;
    locations?: Record<string, Airport>;
  };
  meta?: {
    count: number;
    links?: {
      self: string;
    };
  };
}

// ============================================
// UI State Types
// ============================================

export interface LoadingState {
  isSearching: boolean;
  isLoadingAirports: boolean;
  error: string | null;
}

export interface SortOption {
  field: 'price' | 'duration' | 'departure' | 'arrival';
  direction: 'asc' | 'desc';
}

// ============================================
// Utility Types
// ============================================

export type FlightClass = 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';

export interface AirlineInfo {
  code: string;
  name: string;
}

export interface ProcessedFlight extends FlightOffer {
  // Additional computed fields for easier UI rendering
  totalDuration: number; // in minutes
  totalStops: number;
  mainAirline: string;
  departureTime: Date;
  arrivalTime: Date;
  priceNumeric: number;
}