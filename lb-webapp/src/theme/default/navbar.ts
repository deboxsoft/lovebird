import color from 'color';
import { variables } from './variables';
import { NavbarTheme, NavbarLinkTheme } from '@deboxsoft/component-webapp-react/navbar/types';

export const navbarTheme: NavbarTheme = {
  colors: {
    color: variables.navbarDarkColor,
    borderColor: undefined,
    backgroundColor: '#24292E'
  },
  padding: '0.5rem 1rem',
  height: '64px'
};

export const navbarLinkTheme: NavbarLinkTheme = {
  colors: {
    colorDisabled: variables.navbarDarkColorDisabled,
    colorActive: variables.navbarDarkColorActive,
    colorActiveHoverFocus: variables.navbarDarkColorHoverFocus,
    color: variables.navbarDarkColor,
    colorHoverFocus: variables.navbarDarkColorHoverFocus
  },
  padding: {
    top: '0.3125rem',
    bottom: '0.2135rem'
  },
  font: {
    size: variables.fontSize
  },
  brands: {
    font: {}
  }
};
