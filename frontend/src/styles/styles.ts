import { createGlobalStyle } from 'styled-components';

export const Styles = createGlobalStyle`
  :root {
    --color-primary: #8FFFCA;
    --color-secondary: #BF00FF; // other option 
    --color-tertiary: #fff;
    --font-family-type: Courier New, Courier, sans-serif;
    --font-family: ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Helvetica Neue,
    Arial,
    Noto Sans,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji,
    Segoe UI Symbol,
    Noto Color Emoji;
    --screen-xs: 576px;
  }

  @font-face {
    font-family: var(--font-family);
    font-style: normal;
  }

  @font-face {
    font-family: var(--font-family);
    font-style: normal;
  }


  body,
  html,
  a {
    font-family: var(--font-family);, sans-serif;
  }


  body {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    background: #fff;
    overflow-x: hidden;
  }

  a:hover {
    color: var(--color-secondary);
  }

  input,
  textarea {
    border-radius: 4px;
    border: 0;
    background: rgb(241, 242, 243);
    transition: all 0.3s ease-in-out;
    outline: none;
    width: 100%;
    padding: 1rem 1.25rem;

    :focus-within {
      background: none;
      box-shadow: var(--color-secondary) 0px 0px 0px 1px;
    }
  }

  h1,
  h2 {
    font-family: var(--font-family);
    color: var(--color-secondary);
    font-size: 4rem;
    font-weight: 800;
    letter-spacing: .0375em;
    margin-bottom: 3rem;

    @media only screen and (max-width: 576px) {
      font-size: 2.25rem;
    }
  }

  h3 {
    font-family: var(--font-family);
    color: var(--color-black);
    font-size: 4rem;
    font-weight: 800;
    letter-spacing: -.025em;

    @media only screen and (max-width: 576px) {
      font-size: 1.25rem;
    }
  }

  h4 {
    font-family: var(--font-family-type);
    color: var(--color-black);
    font-size: 1rem;
    text-transform: uppercase;
    line-height: 1rem;
    font-weight: 600;
    letter-spacing: .025em;

    @media only screen and (max-width: 960px) {
      font-size: 1rem;
    }
  }

  h5 {
    font-family: var(--font-family);
    color: var(--color-black);
    font-size: 2.25rem;
    line-height: 2rem;
    font-weight: 600;
    letter-spacing: -.025em;

    @media only screen and (max-width: 960px) {
      font-size: 1.875rem;
      text-align: left;
    }
  }

  p {
    color: var(--color-tertiaty);
    color: var(--color-tertiaty);
    font-size: 1.25rem;

    @media only screen and (max-width: 576px) {
      font-size: 1rem;
    }
  }

  a {
    text-decoration: none;
    outline: none;
    color: var(--color-tertiaty);

    :hover {
      color: var(--color-secondary);
    }
  }

  *:focus {
    outline: none;
  }

  .about-block-image svg {
    text-align: center;
  }

  .ant-drawer-content-wrapper {
    height: 0 !important;
    min-height: 17rem;
  }

  .ant-drawer-body {
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: flex-end;
  }

  .MuiSvgIcon-root.MuiStepIcon-root.Mui-active,
  .MuiSvgIcon-root.MuiStepIcon-root.Mui-completed {
    color: var(--color-primary) !important;
  }

  .MuiFormLabel-root.Mui-focused {
    color: var(--color-secondary) !important;
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: var(--color-secondary) !important;
  }

  .admin-logo {
    display: flex;
    justify-content: center;
    height: 5rem;
  }
  
  .ant-tooltip-inner {
    color: var(--color-gray) !important;
    background-color: var(--color-white) !important;
  }
  
  
  // Google Maps footer removal
  .gmnoprint a, .gmnoprint span {
    display:none;
  }
  .gmnoprint div {
    background:none !important;
  }
  #GMapsID div div a div img{
    display:none;
  }

  .gm-style-cc:last-child {
    display: none !important;
  }
  a[title="Report errors in the road map or imagery to Google"] {
    display: none !important;
  }
`;
