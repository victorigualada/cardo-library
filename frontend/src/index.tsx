/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/reset.css';

import Router from './router';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './components/Auth/auth-provider';

interface AppProps {
  hideLoader: () => void;
}

const App = ({ hideLoader}: AppProps) => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Router hideLoader={hideLoader}/>
      </AuthProvider>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById('root')!);
const loader = document.querySelector('#loader');
const body = document.querySelector('body');

const hideLoader = () => {
  loader?.remove();
  body!.style.overflow = 'auto';
};

root.render(<App hideLoader={hideLoader}/>);
