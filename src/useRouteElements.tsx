import { Outlet, useRoutes, Navigate } from 'react-router-dom'
import { Suspense, lazy, useContext } from 'react'
import { AppContext } from './contexts/app.context'
import MainLayout from './layouts/MainLayout'
import path from './constants/path.constant'
import AccountLayout from './pages/Account/layouts/AccountLayout'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Profile = lazy(() => import('./pages/Account/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ChangePassword = lazy(() => import('./pages/Account/ChangePassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
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
          path: path.login,
          element: (
            <Suspense>
              <Login />
            </Suspense>
          )
        },
        {
          path: path.register,
          element: (
            <Suspense>
              <Register />
            </Suspense>
          )
        },
        {
          path: path.reset,
          element: (
            <Suspense>
              <ResetPassword />
            </Suspense>
          )
        },
        {
          path: path.account,
          element: (
            <MainLayout>
              <AccountLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.password,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            }
          ]
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
          <Suspense>
            <Home />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return routeElements
}
