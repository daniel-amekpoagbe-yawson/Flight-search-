# ✈️ Flight Search Engine

A modern, responsive flight search application built with React, TypeScript, and the Amadeus API. Features real-time filtering, live price visualization, and a clean, intuitive interface.

## 🚀 Features

- **Smart Search**: Airport autocomplete with real-time suggestions
- **Advanced Filtering**: Multi-dimensional filters (price, stops, airlines, time)
- **Live Price Graph**: Real-time price distribution chart that updates with filters
- **Responsive Design**: Seamless experience on mobile and desktop
- **Performance Optimized**: Smart caching with React Query, code splitting
- **Type-Safe**: Built with TypeScript for reliability

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Routing**: TanStack Router
- **State Management**: React Query (TanStack Query)
- **API**: Amadeus Self-Service API
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js 18+ and npm
- Amadeus API credentials (free test environment)
  - Get them at: https://developers.amadeus.com/

## 🏃 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd flight-search-engine
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_AMADEUS_API_KEY=your_api_key_here
VITE_AMADEUS_API_SECRET=your_api_secret_here
VITE_AMADEUS_API_URL=https://test.api.amadeus.com/v2
```

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 4. Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Input, Card)
│   ├── search/          # Search form components
│   ├── filters/         # Filter panel components
│   ├── results/         # Flight results display
│   └── charts/          # Price visualization
├── hooks/               # Custom React hooks
├── services/            # API integration layer
├── types/               # TypeScript type definitions
├── utils/               # Helper functions
└── routes/              # TanStack Router pages
```

## 🎯 Key Features Explained

### Real-Time Filtering
All filters (price, stops, airlines, departure/arrival times) work simultaneously and update both the flight list and price graph instantly. The implementation uses React's useMemo for optimal performance.

### Smart Caching
React Query handles data fetching with intelligent caching:
- Airport searches are cached for 30 minutes (static data)
- Flight searches are cached for 5 minutes (relatively stable)
- Automatic background refetching keeps data fresh

### Responsive Design
The interface adapts seamlessly from mobile to desktop:
- Stacked layout on mobile
- Sidebar filters on desktop
- Touch-friendly controls
- Optimized for various screen sizes

### Type Safety
Comprehensive TypeScript types ensure:
- API response validation
- Component prop checking
- Reduced runtime errors
- Better developer experience

## 🔧 API Integration

The app uses the Amadeus Flight Offers Search API:
- **Authentication**: OAuth2 client credentials flow
- **Endpoints**: 
  - Airport/Location search for autocomplete
  - Flight offers search for results
- **Rate Limits**: Handled with caching and error boundaries

## 🎨 Design Decisions

### Component Architecture
- **Atomic Design**: Small, reusable UI components
- **Smart/Dumb Pattern**: Container vs presentational components
- **Code Splitting**: Lazy loading for optimal bundle size

### State Management
- **Local State**: React useState for UI interactions
- **Server State**: React Query for API data
- **Computed State**: useMemo for derived values

### Performance Optimizations
- Debounced airport search
- Memoized filter calculations
- Virtual scrolling for large result sets
- Lazy-loaded route components

## 📊 Data Flow

1. User enters search criteria
2. Form validates and calls Amadeus API
3. React Query caches raw response
4. Data is processed and enriched
5. Filters are applied in real-time
6. Results and chart update instantly

## 🧪 Testing Approach

While formal tests aren't included due to time constraints, the code is structured for testability:
- Pure utility functions
- Isolated hooks
- Predictable data transformations
- Clear component boundaries

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel --prod
```

Add environment variables in Vercel dashboard.

### Netlify

```bash
npm run build
# Upload dist/ folder or connect Git repo
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_AMADEUS_API_KEY` | Your Amadeus API key | `abc123...` |
| `VITE_AMADEUS_API_SECRET` | Your Amadeus API secret | `xyz789...` |
| `VITE_AMADEUS_API_URL` | API base URL | `https://test.api.amadeus.com/v2` |

## 🤝 Contributing

This is a technical assessment project, but feedback is welcome!

## 📄 License

MIT

## 👨‍💻 Author

Daniel - Built for Ena Spotter Frontend Assessment

---

**Note**: This project uses the Amadeus Test Environment. For production use, update the API URL and obtain production credentials.