import {
  FormCheckTheme,
  FormCheckInputTheme,
  FormControlTheme,
  FormControlFileTheme,
  FormControlPlainTextTheme,
  FormGroupTheme,
  FormInlineTheme,
  FormTextTheme,
  InputGroupTheme,
  InputGroupAppendTheme,
  InputGroupPrependTheme,
  InputGroupTextTheme
} from '@deboxsoft/component-webapp-react/form/types';
import { variables, colors } from './variables';

export const formCheckTheme: FormCheckTheme = {
  margin: {
    labelBottom: '0',
    inputTop: '0',
    inputLeft: '0',
    inlineRight: '0.75rem',
    inputRight: '0.3125rem'
  },
  padding: {
    inlineLeft: '0'
  }
};

export const formCheckInputTheme: FormCheckInputTheme = {
  colors: {
    colorDisabled: colors.gray,
    colorLabelDisabled: colors.gray
  },
  margin: {
    left: '-1.25rem',
    top: '0.3rem'
  }
};

export const formControlTheme: FormControlTheme = {
  colors: {
    color: colors.gray700,
    backgroundColor: colors.white,
    borderColor: colors.gray400,
    borderFocusColor: '#80bdff',
    boxShadowFocus: 'rgba(0, 123, 255, 0.25)',
    boxShadowValidColor: 'rgba(40, 167, 69, 0.25)',
    boxShadowInvalidColor: 'rgba(220, 53, 69, 0.25)',
    placeholderColor: colors.gray,
    backgroundDisabledReadonlyColor: colors.gray200,
    borderValidColor: colors.green,
    borderInvalidColor: colors.red
  },
  border: variables.border,
  borderRadius: variables.borderRadius,
  boxShadow: '0 0 0 0.2rem',
  font: {
    size: {
      sm: '0.875rem',
      md: '1rem',
      default: '1rem',
      lg: '1.25rem'
    }
  },
  height: {
    select: {
      sm: 'calc(1.8125rem + 2px)',
      md: 'calc(2.25rem + 2px)',
      default: 'calc(2.875rem + 2px)',
      lg: 'calc(3rem + 2px)'
    }
  },
  padding: {
    sm: '0.25rem 0.5rem',
    default: '0.375rem 0.75rem',
    lg: '0.5rem 1rem'
  }
};

export const formControlPlainTextTheme: FormControlPlainTextTheme = {
  colors: {
    borderColor: 'transparent',
    backgroundColor: 'transparent'
  },
  padding: '0.375rem 0',
  margin: {}
};
export const formControlFileTheme: FormControlFileTheme = {};
export const formGroupTheme: FormGroupTheme = {
  margin: {
    inlineBottom: '0',
    nomb: {
      noRow: '',
      rowLeft: '-5px',
      rowRight: '-5px',
      rowBottom: '0',
      rowDivLabelBottom: '0'
    },
    bottom: '1rem',
    rowRight: '-5px',
    rowLeft: '-5px',
    rowDivLabelBottom: '0'
  },
  padding: {},
  font: {
    size: variables.fontSize
  },
  borderRadius: variables.borderRadius
};
export const formInlineTheme: FormInlineTheme = {};
export const formTextTheme: FormTextTheme = {
  colors: {
    colorMuted: colors.gray
  },
  margin: {
    top: '0.25rem'
  }
};
export const inputGroupTheme: InputGroupTheme = {
  font: { size: variables.fontSize, weight: '400' },
  borderRadius: variables.borderRadius,
  colors: {
    color: colors.gray700,
    backgroundColor: colors.gray200,
    borderColor: colors.gray400
  },
  padding: {
    sm: '0.25rem 0.5rem',
    default: '0.375rem 0.75rem',
    lg: '0.5rem 1rem',
    md: '0.5rem 1rem'
  }
};
export const inputGroupTextTheme: InputGroupTextTheme = Object.assign(inputGroupTheme, {
  margin: {
    radioCheckbox: '0 0 0.4125rem 0',
    bottom: '0'
  }
});
export const inputGroupAppendTheme: InputGroupAppendTheme = {};
export const inputGroupPrependTheme: InputGroupPrependTheme = {};
