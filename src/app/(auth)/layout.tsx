import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-gradient-to-r from-blue-300 via-purple-500 to-blue-500'>
      {children}
    </div>
  )
}

export default AuthLayout
