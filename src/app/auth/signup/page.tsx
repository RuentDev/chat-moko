
import { authOptions } from '@/app/auth'
import AuthButton from '@/components/Buttons/AuthButton'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (session) {
    return (
      <div>
        {session && session?.user ? session.user.name : null}
      </div>
    )
  }

  return (
    <div>

      <AuthButton label='google' />
    </div>
  )
}

