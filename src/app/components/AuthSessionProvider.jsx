import React from 'react'
import { auth } from '../../../auth'

const AuthSessionProvider = async({children}) => {
 const serverSession = await auth();
  return (
    <div session={serverSession}>{children}</div>
  )
}

export default AuthSessionProvider