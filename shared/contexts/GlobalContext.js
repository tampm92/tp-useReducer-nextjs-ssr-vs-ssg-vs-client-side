import React, { useContext, createContext } from 'react'

import { useGlobalStore } from '@/store/GlobalStore'

const GlobalContext = createContext()

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export function GlobalProvider({ children }) {
  const {state, dispatch} = useGlobalStore()

  return (
    <GlobalContext.Provider value={{
      state, dispatch
    }}>{children}
    </GlobalContext.Provider>
  )
}