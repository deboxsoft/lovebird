import React from 'react';
import { mount, route, lazy, Matcher } from 'navi';

export const routes: Matcher<{}> = mount({
  '/': route({
    title: 'home',
    view: () => (
      <>
        <div>home</div>
      </>
    )
  }),
  '/farm': lazy(() => import('modules/farm-management/route'))
});
