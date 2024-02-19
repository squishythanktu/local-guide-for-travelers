import { Outlet, useRoutes, Navigate } from 'react-router-dom'
import { Suspense, lazy, useContext } from 'react'
import { AppContext } from './contexts/app.context'
import MainLayout from './layouts/MainLayout'
import path from './constants/path.constant'
import AccountLayout from './pages/Account/layouts/AccountLayout'
import HomeLayout from './layouts/HomeLayout'
import TourDetailLayout from './pages/TourDetail/layouts/TourDetailLayout'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Profile = lazy(() => import('./pages/Account/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ChangePassword = lazy(() => import('./pages/Account/ChangePassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const Search = lazy(() => import('./pages/Search'))
const TourManagement = lazy(() => import('./pages/Account/TourManagement'))

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
          path: path.tourDetail,
          element: (
            <MainLayout>
              <TourDetailLayout />
            </MainLayout>
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
              path: path.tour,
              element: (
                <Suspense>
                  <TourManagement />
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
      path: 'tours/search',
      element: (
        <MainLayout>
          <Suspense>
            <Search />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: 'guides/search',
      element: (
        <MainLayout>
          <Suspense>
            <Search />
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
