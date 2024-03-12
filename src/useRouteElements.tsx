import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path.constant'
import { AppContext } from './contexts/app.context'
import HomeLayout from './layouts/HomeLayout'
import MainLayout from './layouts/MainLayout'
import AccountLayout from './pages/Account/layouts/AccountLayout'
import Loading from './pages/Loading'
import TourDetailLayout from './pages/TourDetail/layouts/TourDetailLayout'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Profile = lazy(() => import('./pages/Account/Profile'))
const ChangePassword = lazy(() => import('./pages/Account/ChangePassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const SearchTours = lazy(() => import('./pages/SearchTours'))
const SearchGuides = lazy(() => import('./pages/SearchGuides'))
const TourManagement = lazy(() => import('./pages/Account/TourManagement'))
const ScheduleManagement = lazy(() => import('./pages/Account/ScheduleManagement/ScheduleManagement'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Cart = lazy(() => import('./pages/Cart'))
const BookingSuccess = lazy(() => import('./pages/BookingSuccess'))
const BookingFail = lazy(() => import('./pages/BookingFail'))
const GuideProfile = lazy(() => import('./pages/GuideProfile'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))
const RequestTour = lazy(() => import('./pages/RequestTour/RequestTour'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
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
          path: path.bookingSuccess,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <BookingSuccess />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.bookingFail,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <BookingFail />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.requestTour,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <RequestTour />
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
      path: path.guideProfile,
      element: (
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <GuideProfile />
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
