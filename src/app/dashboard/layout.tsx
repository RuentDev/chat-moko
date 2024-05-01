import React, { Suspense } from 'react'
import DashboardLoading from './loading'
import Sidebar from '@/components/Sidebar/Sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='dashboard-layout w-full h-screen bg-[#131517] flex gap-[2px]'>
      <Sidebar />
      <Suspense fallback={<DashboardLoading />}>
        {children}
      </Suspense>
    </div>
  )
}

export default DashboardLayout
