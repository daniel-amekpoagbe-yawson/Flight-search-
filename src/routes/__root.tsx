import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{' '}
   
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools  />
    <ReactQueryDevtools initialIsOpen={false} />
  </>
)

export const Route = createRootRoute({ component: RootLayout })