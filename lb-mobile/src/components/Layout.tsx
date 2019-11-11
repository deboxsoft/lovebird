import React from 'react';
import { light as lightTheme, mapping } from '@eva-design/eva';
import { Layout as LayoutComponent, ApplicationProvider, LayoutProps } from 'react-native-ui-kitten';

export const Layout = ({ children, ...props }: LayoutProps) => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <LayoutComponent {...props}>{children}</LayoutComponent>
  </ApplicationProvider>
);
