import React from 'react';
import styled from 'styled-components/macro';
import { Nav, NavLink, Container } from '@deboxsoft/component-webapp-react';

interface SideMenuProps {}

const SideMenuStyled = styled.aside`
  flex: 0 0 260px;
  padding: 5px 5px;
  background-color: white;
  transition: all 0.3s ease;
  border-right: 1px solid #e1e4e8;
`;
export const SideMenu = ({  }: SideMenuProps) => (
  <SideMenuStyled>
    <Container fluid>
      <Nav type="vertical">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/farm">Breeding</NavLink>
        <Nav type="vertical">
          <NavLink href="/farm/register-bird">register Burung</NavLink>
        </Nav>
      </Nav>
    </Container>
  </SideMenuStyled>
);
