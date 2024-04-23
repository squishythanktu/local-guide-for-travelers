import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLocalStorage, getProfileFromLocalStorage } from 'src/utils/auth'
import Stomp from 'stompjs'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  profile: User | null
  setProfile: Dispatch<SetStateAction<User | null>>
  reset: () => void
  stompClient: Stomp.Client | null
  setStompClient: Dispatch<SetStateAction<Stomp.Client | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLocalStorage(),
  setProfile: () => null,
  reset: () => null,
  stompClient: null,
  setStompClient: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null)

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
    setStompClient(null)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        reset,
        stompClient,
        setStompClient
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
