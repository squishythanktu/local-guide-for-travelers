import { ReactNode, Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path.constant'
import { AppContext } from './contexts/app.context'
import { UserRole } from './enums/user-role.enum'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import HomeLayout from './layouts/HomeLayout'
import MainLayout from './layouts/MainLayout/MainLayout'
import AccountLayout from './pages/Account/layouts/AccountLayout'
import ManagementLayout from './pages/Account/layouts/ManagementLayout/ManagementLayout'
import Loading from './pages/Loading/Loading'

const Home = lazy(() => import('./pages/Home/Home'))
const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'))
const Profile = lazy(() => import('./pages/Account/Profile/Profile'))
const TourDetail = lazy(() => import('./pages/TourDetail/TourDetail'))
const ChangePassword = lazy(() => import('./pages/Account/ChangePassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const ChangePasswordByToken = lazy(() => import('./pages/ResetPassword/ChangePasswordByToken/ChangePasswordByToken'))
const SearchTours = lazy(() => import('./pages/SearchTours'))
const SearchGuides = lazy(() => import('./pages/SearchGuides'))
const TourManagement = lazy(() => import('./pages/Account/TourManagement'))
const ScheduleManagement = lazy(() => import('./pages/Account/ScheduleManagement/ScheduleManagement'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Cart = lazy(() => import('./pages/Cart'))
const Bookings = lazy(() => import('./pages/Bookings/Bookings'))
const Invoices = lazy(() => import('./pages/Invoices/Invoices'))
const BookingSuccess = lazy(() => import('./pages/BookingSuccess'))
const BookingFail = lazy(() => import('./pages/BookingFail'))
const GuideProfile = lazy(() => import('./pages/GuideProfile'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))
const RequestTour = lazy(() => import('./pages/RequestTour/RequestTour'))
const SalesReportOfTour = lazy(() => import('./pages/SalesReportOfTour/SalesReportOfTour'))
const SalesReportOfToursByGuide = lazy(() => import('./pages/SalesReportOfToursByGuide/SalesReportOfToursByGuide'))
const SalesReportOfGuide = lazy(() => import('./pages/SalesReportOfGuide/SalesReportOfGuide'))
const TourConfirmation = lazy(() => import('./pages/TourConfirmation/TourConfirmation'))
const GuideConfirmation = lazy(() => import('./pages/GuideConfirmation/GuideConfirmation'))
const Wishlist = lazy(() => import('./pages/Wishlist/Wishlist'))
const GuideApplication = lazy(() => import('./pages/GuideApplication/GuideApplication'))
const CryptoPayment = lazy(() => import('./pages/CryptoPayment/CryptoPayment'))
const TourList = lazy(() => import('./pages/TourList/TourList'))
const BookingManagement = lazy(() => import('./pages/Account/BookingManagement/BookingManagement'))
const TourRequestManagement = lazy(() => import('./pages/Account/TourRequestManagement/TourRequestManagement'))

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

const AdminRoute = () => {
  const { profile, isAuthenticated } = useContext(AppContext)
  return isAuthenticated && profile?.role === UserRole.ADMIN ? <Outlet /> : <Navigate to={path.home} />
}

const UserRoute = () => {
  const { profile, isAuthenticated } = useContext(AppContext)
  return isAuthenticated && profile?.role !== UserRole.ADMIN ? <Outlet /> : <Navigate to={path.admin} />
}

const GuideRoute = ({ children }: { children: ReactNode }) => {
  const { profile, isAuthenticated } = useContext(AppContext)
  return isAuthenticated && profile?.role === UserRole.GUIDER ? children : <Navigate to='*' />
}

const NonAdminRoute = () => {
  const { profile, isAuthenticated } = useContext(AppContext)
  return !isAuthenticated || (isAuthenticated && profile?.role !== UserRole.ADMIN) ? (
    <Outlet />
  ) : (
    <Navigate to={path.admin} />
  )
}

const NonAdminGuiderRoute = () => {
  const { profile, isAuthenticated } = useContext(AppContext)
  return !isAuthenticated || (isAuthenticated && profile?.role === UserRole.TRAVELER) ? (
    <Outlet />
  ) : (
    <Navigate to={path.home} />
  )
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <NonAdminRoute />,
      children: [
        {
          path: path.home,
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
                <TourDetail />
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
          path: path.bookings,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Bookings />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.invoices,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Invoices />
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
          path: path.wishlist,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Wishlist />
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
      ]
    },
    {
      path: '/',
      element: <NonAdminGuiderRoute />,
      children: [
        {
          path: path.guideApplications,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <GuideApplication />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
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
        },
        {
          path: path.changePasswordByToken,
          element: (
            <Suspense fallback={<Loading />}>
              <ChangePasswordByToken />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '/',
      element: <UserRoute />,
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
            }
          ]
        },
        {
          path: path.management,
          element: (
            <MainLayout>
              <ManagementLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.tourRequest,
              element: (
                <Suspense fallback={<Loading />}>
                  <TourRequestManagement />
                </Suspense>
              )
            },
            {
              path: path.tours,
              element: (
                <GuideRoute>
                  <Suspense fallback={<Loading />}>
                    <TourManagement />
                  </Suspense>
                </GuideRoute>
              )
            },
            {
              path: path.schedule,
              element: (
                <GuideRoute>
                  <Suspense fallback={<Loading />}>
                    <ScheduleManagement />
                  </Suspense>
                </GuideRoute>
              )
            },
            {
              path: path.bookingsManagement,
              element: (
                <GuideRoute>
                  <Suspense fallback={<Loading />}>
                    <BookingManagement />
                  </Suspense>
                </GuideRoute>
              )
            },
            {
              path: path.salesReport,
              element: (
                <GuideRoute>
                  <Suspense fallback={<Loading />}>
                    <SalesReportOfToursByGuide />
                  </Suspense>
                </GuideRoute>
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
        },
        {
          path: path.cryptoPayment,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <CryptoPayment />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '/',
      element: <AdminRoute />,
      children: [
        {
          path: path.home,
          element: <Navigate to={path.tourList} />
        },
        {
          path: path.admin,
          element: <AdminLayout />
        },
        {
          path: path.tourConfirmation,
          element: (
            <AdminLayout>
              <Suspense fallback={<Loading />}>
                <TourConfirmation />
              </Suspense>
            </AdminLayout>
          )
        },
        {
          path: path.tourList,
          element: (
            <AdminLayout>
              <Suspense fallback={<Loading />}>
                <TourList />
              </Suspense>
            </AdminLayout>
          )
        },
        {
          path: path.guideConfirmation,
          element: (
            <AdminLayout>
              <Suspense fallback={<Loading />}>
                <GuideConfirmation />
              </Suspense>
            </AdminLayout>
          )
        },
        {
          path: path.salesReportOfTour,
          element: (
            <AdminLayout>
              <Suspense fallback={<Loading />}>
                <SalesReportOfTour />
              </Suspense>
            </AdminLayout>
          )
        },
        {
          path: path.salesReportOfGuide,
          element: (
            <AdminLayout>
              <Suspense fallback={<Loading />}>
                <SalesReportOfGuide />
              </Suspense>
            </AdminLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
