import React, { useState } from 'react';
import styled, { css } from 'styled-components/macro';
import {
  Navbar,
  NavbarLink,
  Container,
  Nav,
  Button,
  NotFoundBoundary
} from '@deboxsoft/component-webapp-react';
import { SizeKey } from '@deboxsoft/component-webapp-react/utils/types';
import { LoadingIndicator } from './LoadingIndicator';
import { Header } from './layout/Header';
import { SideMenu } from './layout/SideMenu';

interface Props {
  children: React.ReactChild;
  loading: boolean;
}

const Main = styled.main`
  display: flex;
  height: calc(100vh - 64px);
`;

const Content = styled.div`
  padding: 10px;
`;

export const Layout = ({ children, loading }: Props) => {
  return (
    <>
      <Header />
      <Main>
        <SideMenu />
        <Content>{children}</Content>
      </Main>
    </>
  );
};

Layout.defaultProps = {
  expand: 'sm'
};
