import { ButtonTheme } from '@deboxsoft/component-webapp-react/button/types';
import { colors, variables } from './variables';

export const buttonTheme: ButtonTheme = {
  colors: {
    default: {},
    dark: {
      color: colors.white,
      colorOutline: colors.gray800,
      colorOutlineHover: colors.white,
      backgroundColor: variables.buttonDarkBackgroundColor,
      backgroundColorDisabled: colors.gray800,
      backgroundColorHoverFocus: variables.buttonDarkHoverFocusBackgroundColor,
      borderColorActive: colors.gray800HoverFocus,
      boxShadow: colors.gray800BoxShadow,
      toggle: {
        color: variables.navbarDarkColor,
        borderColor: variables.navbarDarkBorderColor,
        colorHoverFocus: variables.navbarDarkColor,
        borderColorHoverFocus: variables.navbarDarkBorderColor
      }
    }
  },
  font: {
    size: {},
    toggle: {
      size: {}
    }
  },
  border: {},
  padding: {},
  margin: {},
  borderRadius: {}
};

export const buttonGroupTheme = {
  borderRadius: {},
  margin: {},
  padding: {},
  border: {},
  font: {
    size: {}
  },
  colors: {}
};
