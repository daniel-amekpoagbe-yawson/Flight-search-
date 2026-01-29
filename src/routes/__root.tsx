// import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// const RootLayout = () => (
//   <>
//     <div className="p-2 flex gap-2">
//       <Link to="/" className="[&.active]:font-bold">
//         Home
//       </Link>{' '}
   
//     </div>
//     <hr />
//     <Outlet />
//     <TanStackRouterDevtools  />
//     <ReactQueryDevtools initialIsOpen={false} />
//   </>
// )

// export const Route = createRootRoute({ component: RootLayout })


import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-2 sm:px-4  py-4">
          <h1 className="text-xl font-semibold text-gray-900">✈️ Flight Search Engine</h1>
          <p className="text-xs text-gray-600 font-extratight mt-1">Find and book the best flights for your journey</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  ),
});