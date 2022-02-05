import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import Nav from 'react-bootstrap/Nav';

import Logo from '@assets/logos/theluupe.svg';
import { UserContext } from '@atoms/UserContext';

export const HEADER_HEIGHT = '84px';

export function HorizontalNav() {
  const { accessToken, fullName, isTokenValid, loading, clearTokens } = UserContext.useContainer();
  const isAuthenticated = !!accessToken;

  useEffect(() => {
    if (!loading && !isTokenValid()) {
      clearTokens();
    }
  }, [loading, isTokenValid, clearTokens]);

  const handleLogOut = useCallback(() => {
    clearTokens();
  }, [clearTokens]);

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleLogOut();
    }
  };

  return (
    <header>
      <Wrapper className="py-2 px-4">
        <div className="d-flex align-items-center">
          <Nav.Item className="mr-4">
            <Link href="/">
              <a>
                <Logo css={{ color: 'var(--brand-red)' }} />
              </a>
            </Link>
          </Nav.Item>
          <Nav.Item className="mr-1">
            <a className="nav-link" href="https://theluupe.com/about">
              ABOUT
            </a>
          </Nav.Item>
          <Nav.Item className="mr-1">
            <a className="nav-link" href="https://theluupe.com/brands">
              BRANDS
            </a>
          </Nav.Item>
          <Nav.Item className="mr-1">
            <a className="nav-link" href="https://theluupe.com/our-artists">
              PHOTOGRAPHERS
            </a>
          </Nav.Item>
          <Nav.Item className="mr-1">
            <a className="nav-link" href="https://theluupe.com/blog">
              MAGAZINE
            </a>
          </Nav.Item>
          <Nav.Item className="mr-1">
            <Link href="/posts">
              <a className="nav-link">POSTS</a>
            </Link>
          </Nav.Item>
        </div>
        {isAuthenticated && (
          <Nav.Item>
            <Name>{fullName}</Name>
            <a
              className="btn btn-secondary"
              role="button"
              tabIndex={0}
              onClick={handleLogOut}
              onKeyPress={handleKeyPress}
            >
              Log Out
            </a>
          </Nav.Item>
        )}
        {!isAuthenticated && (
          <Nav.Item className="mr-1">
            <a className="btn btn-secondary" href="/sign-in">
              Log in
            </a>
            <a className="btn btn-primary text-white ml-3" href="/sign-up">
              Sign up
            </a>
          </Nav.Item>
        )}
      </Wrapper>
    </header>
  );
}

const Wrapper = styled(Nav)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${HEADER_HEIGHT};
  border-bottom: 1px solid var(--gray-low-surface);
  background-color: white;
  position: fixed;
  width: 100%;
  top: 0;
`;

const Name = styled.span`
  margin-right: 20px;
`;
