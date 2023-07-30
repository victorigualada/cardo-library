import {createContext, ReactElement, useContext} from 'react';
import {useLocalStorage} from '../../shared/hooks/useLocalStorage';

interface AuthContextInterface {
  user: any;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextInterface>({
  user: null,
  setUser: (auth) => auth,
})

const useAuthContext = () => useContext(AuthContext)

export interface AuthProviderProps {
  children: ReactElement
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage('user', null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuthContext, AuthProvider, AuthContext }