import styled from 'styled-components';

export const Logo = styled('img')`
  max-width: 75%;
`;

export const HeaderSection = styled('header')<{ height?: string }>`
  padding-top: 0.75rem;
  margin-bottom: 1.5rem;
  background-color: var(--color-primary);
`;

export const NavLink = styled('div')`
  display: inline-block;
  text-align: center;
`;

export const SideMenu = styled('h1')`
`;

export const Menu = styled('h1')`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

export const CustomNavLinkSmall = styled(NavLink)`
  font-size: 1.25rem;
  color: var(--color-secondary);
  transition: color 0.2s ease-in;
  margin: 0 2rem;
`;

export const Span = styled('span')`
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  
  &:hover,
  &:active,
  &:focus {
    text-underline-position: under;
    text-decoration: var(--color-secondary) underline;
    text-underline-offset: 5px;
  }
`;

export const UnderLogoText = styled('span')`
  color: var(--color-secondary);
  font-weight: 600;
  font-size: 3rem;
  
  margin: 3rem 0;
`;
