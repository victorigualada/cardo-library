import {Row} from 'antd';
import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import Container from '../Content/Container';
import {CustomNavLinkSmall, HeaderSection, Logo, SideMenu, Span, UnderLogoText} from './styles';
import {useAuth} from '../../shared/hooks/useAuth';

const logoFile: string = process.env.REACT_APP_LOGO_FILE!;

const Header = () => {
  const navigate = useNavigate();

  const { authenticatedUser, signOut } = useAuth();


  const navigateTo = (route: string) => {
    const path = `/${route}`;
    navigate(path);
  };

  const MenuItem = () => {
    return authenticatedUser
      ? (
       <SideMenu>
        <CustomNavLinkSmall onClick={signOut}>
          <Span>{'Sign out'}</Span>
        </CustomNavLinkSmall>
      </SideMenu>
      )
      : (
        <SideMenu>
          <CustomNavLinkSmall onClick={() => navigateTo('login')}>
            <Span>{'Log in'}</Span>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall onClick={() => navigateTo('signup')}>
            <Span>{'Sign up'}</Span>
          </CustomNavLinkSmall>
        </SideMenu>
      );
  };

  return (
    <HeaderSection>
      <Container style={{ textAlign: 'center' }}>
        <Row style={{ maxWidth: '80rem', alignItems: 'center', justifyContent: 'end' }}>
          <MenuItem />
        </Row>
        <Row style={{ maxWidth: '80rem', alignItems: 'center', justifyContent: 'space-around' }}>
          <Logo src={`/assets/${logoFile}`} alt={'Cardo Library'}/>
          <UnderLogoText>Explore our books!</UnderLogoText>
        </Row>
      </Container>
    </HeaderSection>
  );
};

export default Header;
