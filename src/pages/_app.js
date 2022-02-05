import { css, Global } from '@emotion/core';
import Head from 'next/head';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import ReactNotification from 'react-notifications-component';
import 'isomorphic-unfetch';
import 'core-js';

// CSS
import '@theluupe/ui-theme/index.css';
import 'rc-slider/assets/index.css';
import 'react-day-picker/lib/style.css';
import 'react-notifications-component/dist/theme.css';
import '@szhsin/react-menu/dist/index.css';
import { UserContext } from '@atoms/UserContext';

Router.events.on('routeChangeComplete', () => {
  window.scrollTo(0, 0);
});

const globalStyles = css`
  body {
    font-family: 'Sailec', Arial, Helvetica, sans-serif;
  }

  .notification-container--bottom-center,
  .notification-container--center,
  .notification-container--top-center {
    left: 50%;
    transform: translate(-50%, 0);
    max-width: 90vw;
  }
`;

const WebApp = ({ Component, pageProps }) => {
  return (
    <UserContext.Provider>
      <Head>
        <title>The Luupe</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Global styles={globalStyles} />

      <ReactNotification />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
};
WebApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
};
WebApp.defaultProps = {
  pageProps: {},
};

// eslint-disable-next-line import/no-default-export
export default WebApp;
