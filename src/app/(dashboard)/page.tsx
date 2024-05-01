import { NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'

const DashboardPage: NextPage =  async () => {

  const session  = await getServerSession(authOptions)

  return (
    <div className='w-full h-full'>
      dashboard
    </div>
  )
}

export default DashboardPage