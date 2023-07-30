import {AuthProviderProps, useAuthContext} from './auth-provider';
import {Navigate} from 'react-router-dom';
import {ReactElement} from 'react';
import {useLocalStorage} from '../../shared/hooks/useLocalStorage';

const RequireAuth = ({ children }: AuthProviderProps): ReactElement => {
  const auth: any = useAuthContext();
  const [user] = useLocalStorage('user', null);

  if (!user && !auth.user) {
    return <Navigate to='/login' state={{ from: location.pathname }} />
  }
  return children
}

export default RequireAuth;