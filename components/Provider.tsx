import { SessionProvider } from 'next-auth/react'
import React from 'react'

type ChildrenType = {

children : React.ReactNode

}

const Provider = ({children}:ChildrenType) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
};

export default Provider ;