import axios, {AxiosResponse} from 'axios';
import {User} from '../types/user';
import {useLocation, useNavigate} from 'react-router-dom'
import {useState} from 'react';
import {useLocalStorage} from './useLocalStorage';

const apiUrl: string = process.env.REACT_APP_API_URL!;

interface AuthResponse {
  access_token: string;
}

export const useAuth = () => {
  const [user, setUser] = useState(null as any);
  const [authenticatedUser,setValue] = useLocalStorage('user', null);
  const navigate = useNavigate();
  const location = useLocation();

  const signIn = async (formUser: User) => {
    try {
      let authResult: AxiosResponse<AuthResponse> = await axios.post(`${apiUrl}/auth/login`, formUser);
      let userObj = { jwtToken: authResult.data.access_token };
      setValue(userObj);

      setUser(userObj);
      navigate(location.state?.from || '/');
    } catch  {} // eslint-disable-line no-empty
  };

  const signOut = () => {
    setUser(null);
    setValue(null);
    navigate(0);
  };

  return { user, authenticatedUser, setUser, signIn, signOut };
};