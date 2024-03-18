import { Outlet } from 'react-router-dom'
import ManagementSideNav from '../../components/ManagementSideNav/ManagementSideNav'

const ManagementLayout: React.FC = () => {
  return (
    <div className='h-full min-h-[600px] py-16 text-sm text-gray-600'>
      <div className='account__container block min-w-80 px-4 md:mx-auto md:px-8 lg:w-full lg:max-w-[1500px] lg:px-8 xl:px-16'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-12'>
          <div className='col-span-1 md:col-span-3 md:pr-4'>
            <ManagementSideNav />
          </div>
          <div className='col-span-1 md:col-span-9'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagementLayout
