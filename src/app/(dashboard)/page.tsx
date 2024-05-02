import { NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'
import { redirect } from 'next/navigation'

const DashboardPage: NextPage =  async () => {

  // const session  = await getServerSession(authOptions)

  return (
    <div className='w-full h-full'>
      
    </div>
  )
}

export default DashboardPage