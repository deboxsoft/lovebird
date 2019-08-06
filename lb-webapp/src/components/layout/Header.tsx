import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Navbar, Container, Nav, NavbarLink, Button } from '@deboxsoft/component-webapp-react';
import { SizeKey } from '@deboxsoft/component-webapp-react/utils/types';

interface Props {
  expand?: SizeKey;
}

export const Header = ({ expand }: Props) => {
  const [hidden, setHidden] = useState(true);
  const onToggleEvent = () => {
    setHidden(prevState => !prevState);
  };
  return (
    <Container fluid>
      <Navbar expand={expand}>
        <Nav type="start">
          <NavbarLink href="/" brand>
            Lovebird
          </NavbarLink>
          <Nav type="end">
            <Button outline themeType="dark" expandScreen={expand} toggleCollapse onClick={onToggleEvent}>
              <span>&#9776;</span>
            </Button>
          </Nav>
        </Nav>
        <Nav type="start" collapse expand={expand} hidden={hidden}>
          <NavbarLink href="/breeding">Breeding</NavbarLink>
          <NavbarLink href="/galery">Bird Collection & Gallery</NavbarLink>
        </Nav>
        <Nav type="end" collapse expand={expand} hidden={hidden}>
          <NavbarLink href="/profile">User</NavbarLink>
        </Nav>
      </Navbar>
    </Container>
  );
};
