import { Outlet } from 'react-router-dom'
import AccountSideNav from '../../components/AccountSideNav'

export default function UserLayout() {
  return (
    <div className='h-screen py-16 text-sm text-gray-600'>
      <div className='account__container block min-w-80 px-4 md:mx-auto md:px-8 lg:w-full lg:max-w-[1400px] lg:px-8 xl:px-[72px]'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='col-span-1 md:col-span-3 '>
            <AccountSideNav />
          </div>
          <div className='col-span-1 md:col-span-9 '>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
