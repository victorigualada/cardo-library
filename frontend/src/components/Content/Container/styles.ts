import styled from 'styled-components';

export const StyledContainer = styled('div')<any>`
  position: relative;
  width: 100%;
  border-top: ${(p) => (p.border ? '1px solid #CDD1D4' : '')};
  margin: 0 auto;

  @media only screen and (max-width: 1024px) {
    padding: 0;
  }

  @media only screen and (max-width: 414px) {
    max-width: 100%;
  }
  
  .ant-row {
    max-width: 80rem;
    margin: 0 auto;
  }
`;
