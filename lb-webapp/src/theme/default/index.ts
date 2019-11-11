import { Theme, BodyTheme } from '@deboxsoft/component-webapp-react/theme/types';
import { tableTheme } from './table';
import { modalTheme } from './modal';
import { listTheme } from './list';
import { linkTheme } from './link';
import { iconTheme } from './icon';
import {
  cardTheme,
  cardBodyTheme,
  cardFooterTheme,
  cardHeaderTheme,
  cardImageTheme,
  cardTextTheme,
  cardTitleTheme
} from './card';

import {
  formCheckTheme,
  formCheckInputTheme,
  formControlTheme,
  formControlFileTheme,
  formControlPlainTextTheme,
  formGroupTheme,
  formInlineTheme,
  formTextTheme,
  inputGroupTheme,
  inputGroupAppendTheme,
  inputGroupPrependTheme,
  inputGroupTextTheme
} from './form';
import { containerTheme } from './container';
import { buttonTheme } from './button';
import { badgeTheme } from './badge';
import { breadcrumbTheme } from './breadcrumb';
import { alertTheme } from './alert';
import { navbarTheme, navbarLinkTheme } from './navbar';
import { navTheme, navLinkTheme } from './navigation';

const bodyTheme: BodyTheme = {
  body: { colors: {} }
};

export const defaultTheme: Theme = {
  container: containerTheme,
  button: buttonTheme,
  card: cardTheme,
  cardBody: cardBodyTheme,
  cardHeader: cardHeaderTheme,
  cardFooter: cardFooterTheme,
  cardImage: cardImageTheme,
  cardTitle: cardTitleTheme,
  navLink: navLinkTheme,
  nav: navTheme,
  navbar: navbarTheme,
  navbarLink: navbarLinkTheme,
  formCheck: formCheckTheme,
  formCheckInput: formCheckInputTheme,
  formControl: formControlTheme,
  formControlPlainText: formControlPlainTextTheme,
  formControlFile: formControlFileTheme,
  formGroup: formGroupTheme,
  formText: formTextTheme,
  formInline: formInlineTheme,
  inputGroup: inputGroupTheme,
  inputGroupText: inputGroupTextTheme,
  inputGroupAppend: inputGroupAppendTheme,
  inputGroupPrepend: inputGroupPrependTheme
};
