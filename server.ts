// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import * as fs from 'fs';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const dataApi = require('./server/routes/api');
const videoApi = require('./server/routes/video');

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

const poster = join(process.cwd(), 'assets/poster')

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// app.use('/api', dataApi);
// TODO: implement data requests securely
/*app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported');
});
*/

// Video
app.use('/video', videoApi);

app.use('/poster', express.static(poster));

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
