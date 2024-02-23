import { Outlet, useRoutes, Navigate } from 'react-router-dom'
import { Suspense, lazy, useContext } from 'react'
import { AppContext } from './contexts/app.context'
import MainLayout from './layouts/MainLayout'
import path from './constants/path.constant'
import AccountLayout from './pages/Account/layouts/AccountLayout'
import HomeLayout from './layouts/HomeLayout'
import TourDetailLayout from './pages/TourDetail/layouts/TourDetailLayout'
import CartLayout from './pages/Cart/layout/CartLayout'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Profile = lazy(() => import('./pages/Account/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ChangePassword = lazy(() => import('./pages/Account/ChangePassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const SearchTours = lazy(() => import('./pages/SearchTours'))
const SearchGuides = lazy(() => import('./pages/SearchGuides'))
const TourManagement = lazy(() => import('./pages/Account/TourManagement'))
const ScheduleManagement = lazy(() => import('./pages/Account/ScheduleManagement/ScheduleManagement'))

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
        }
      ]
    },
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
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
            },
            {
              path: path.tours,
              element: (
                <Suspense>
                  <TourManagement />
                </Suspense>
              )
            },

            {
              path: path.schedule,
              element: (
                <Suspense>
                  <ScheduleManagement />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '',
      index: true,
      element: (
        <HomeLayout>
          <Suspense>
            <Home />
          </Suspense>
        </HomeLayout>
      )
    },
    {
      path: path.tourDetail,
      element: (
        <MainLayout>
          <TourDetailLayout />
        </MainLayout>
      )
    },
    {
      path: path.cart,
      element: (
        <MainLayout>
          <CartLayout />
        </MainLayout>
      )
    },
    {
      path: path.searchTour,
      element: (
        <MainLayout>
          <Suspense>
            <SearchTours />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.searchGuide,
      element: (
        <MainLayout>
          <Suspense>
            <SearchGuides />
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
