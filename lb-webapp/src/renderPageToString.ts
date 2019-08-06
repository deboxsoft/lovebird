import { createMemoryNavigation } from 'navi';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { NavigationProvider, View } from '@deboxsoft/component-webapp-react';

async function renderCreateReactAppTemplate({ config, replaceTitleWith, insertIntoRootDiv }) {
  let html = (await config.fs.readFile(config.entry)).toString('utf8');

  // Replace the <title> tag with the contents of `replaceTitle`,
  // allowing the head to be modified.
  const END = '</title>';
  const titleStart = html.indexOf('<title>');
  const titleEnd = html.indexOf(END);
  if (titleStart !== -1 && titleEnd !== -1) {
    html = html.slice(0, titleStart) + replaceTitleWith + html.slice(titleEnd + END.length);
  }

  // Inject rendered content into HTML
  html = html.replace('<div id="root">', `<div id="root">${insertIntoRootDiv}`);

  return html;
}

async function renderPageToString({ config, exports, routes, dependencies, url }) {
  const canonicalURLBase = process.env.CANONICAL_URL || process.env.PUBLIC_URL || '';

  // Create an in-memory Navigation object with the given URL
  const navigation = createMemoryNavigation({
    routes,
    url
  });

  // Wait for any asynchronous content to finish fetching
  const route = await navigation.getSteadyValue();

  // react-helmet thinks it's in a browser because of JSDOM, so we need to
  // manually let it know that we're doing static rendering.
  Helmet.canUseDOM = false;

  // styled-components thinks it's in a browser because of JSDOM,
  // so let it know that it's not in a browser.
  // exports.StyleSheet.reset(true);

  const sheet = new exports.ServerStyleSheet();

  // Render the content
  const bodyHTML = ReactDOMServer.renderToString(
    sheet.collectStyles(
      React.createElement(NavigationProvider, { navigation }, React.createElement(exports.App || View))
    )
  );

  const styleTags = sheet.getStyleTags();

  // This must be called after rendering the app, as stylesheet tags are
  // captured as they're imported
  const stylesheetTags = Array.from(dependencies.stylesheets)
    .map(pathname => `<link rel="stylesheet" href="${pathname}" />`)
    .join('');

  // Generate page head
  const helmet = Helmet.renderStatic();
  const metaHTML = `
    ${(helmet.title && helmet.title.toString()) || `<title>${route.title}</title>`}
    ${helmet.meta && helmet.meta.toString()}
    ${helmet.link && helmet.link.toString()}
  `;

  // This loads the react-scripts generated index.html file, and injects
  // our content into it
  return renderCreateReactAppTemplate({
    config,
    insertIntoRootDiv: bodyHTML,
    replaceTitleWith: `<link rel="canonical" href="${canonicalURLBase +
      url.href}" />\n${metaHTML}${stylesheetTags}${styleTags}`
  });
}

export default renderPageToString;
