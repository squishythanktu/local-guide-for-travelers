import { Outlet, useRoutes, Navigate } from 'react-router-dom'
import { Suspense, lazy, useContext } from 'react'
import { AppContext } from './contexts/app.context'
import MainLayout from './layouts/MainLayout'
import path from './constants/path.constant'
import AccountLayout from './pages/Account/layouts/AccountLayout'
import HomeLayout from './layouts/HomeLayout'
import TourDetailLayout from './pages/TourDetail/layouts/TourDetailLayout'
import Loading from './pages/Loading'

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
const Checkout = lazy(() => import('./pages/Checkout'))
const Cart = lazy(() => import('./pages/Cart'))
const Invoice = lazy(() => import('./pages/Invoice'))

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
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          )
        },
        {
          path: path.register,
          element: (
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          )
        },
        {
          path: path.reset,
          element: (
            <Suspense fallback={<Loading />}>
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
                <Suspense fallback={<Loading />}>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.password,
              element: (
                <Suspense fallback={<Loading />}>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.tours,
              element: (
                <Suspense fallback={<Loading />}>
                  <TourManagement />
                </Suspense>
              )
            },

            {
              path: path.schedule,
              element: (
                <Suspense fallback={<Loading />}>
                  <ScheduleManagement />
                </Suspense>
              )
            }
          ]
        },
        {
          path: path.invoice,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Invoice />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      index: true,
      element: (
        <HomeLayout>
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        </HomeLayout>
      )
    },
    {
      path: path.tourDetail,
      element: (
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <TourDetailLayout />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.cart,
      element: (
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <Cart />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.searchTour,
      element: (
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <SearchTours />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.searchGuide,
      element: (
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <SearchGuides />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.checkout,
      element: (
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <Checkout />
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
