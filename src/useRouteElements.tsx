import { Outlet, useRoutes, Navigate } from 'react-router-dom'
import { Suspense, lazy, useContext } from 'react'
import { AppContext } from './contexts/app.context'
import PATH from './constants/path.constant'
import MainLayout from './layouts/MainLayout/MainLayout'
import Loading from './pages/Loading/Loading'

const Home = lazy(() => import('./pages/Home/Home'))
const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.login} />
}

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <RejectedRoute />,
      children: [
        {
          path: PATH.login,
          element: (
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          )
        },
        {
          path: PATH.register,
          element: (
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '/',
      element: <ProtectedRoute />,
      children: []
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return routeElements
}
