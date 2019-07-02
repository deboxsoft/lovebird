import React from 'react';
import { mount, route } from 'navi';

export const routes = mount({
  '/': route({
    title: 'home',
    view: () => (
      <>
        <div>home</div>
      </>
    )
  }),
  '/breeding': route({
    title: 'breeding',
    getView: request => {
      return <div>breeding {request.url}</div>;
    }
  })
});
