import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-white transition-colors duration-300">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-base sm:text-lg font-semibold text-gray-900">✈️ Flight Search</h1>
            <p className="text-xs text-gray-600 font-normal mt-0.5">Find and book flights</p>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4">
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </main>
    </div>
  ),
});