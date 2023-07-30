import * as React from 'react';
import {lazy, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Header from '../../components/Header/index';
import Books from '../../components/Books';

const Container = lazy(() => import('../../components/Content/Container'));

const Home = () => {
  const location = useLocation();

  const [isLoading] = useState(true);

  useEffect(
    () => {
      if (location.pathname && location.pathname !== '/') {
        const element = document.getElementById(location.pathname.substring(1)) as HTMLDivElement;
        element && element.scrollIntoView({
          behavior: 'smooth',
        });
      }
    },
    [isLoading]
  );

  return (
    <>
      <Container id='header'>
        <Header />
      </Container>
      <Container id='books'>
        <Books />
      </Container>
    </>
  );
};

export default Home;
