import { mount, route, lazy } from 'navi';
import React, { Suspense } from 'react';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';

render(<div>test</div>, document.getElementById('debox-app'));

serviceWorker.unregister();
