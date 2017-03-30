# Box With 3 Tabs

This is a simple web application providing three main functionalities:

1. providing data read from a locally stored log file (Verilog file), parsing it and presenting some sample data
1. serving data from three RSS feeds ordered by date of publication (newest first)
1. showing some photographs taken from Flickr using Flickr API

The app consists of:
- the main `index.html` file
- `vendor.js` file with all tools/utility JavaScript libraries (jQeury, MomentJS, Lodash, url-parse library) used by the app
- `systemjs` dependency library which helps to run the app combined with the vendor libs
- locally stored Verilog file provided by a separate server 

All JavaScript files are build using Webpack. The build process can be carried out using <i>npm scripts</i> (see `package.json` file and description below).
The html build is done in runtime using precompiled Handlebars templates. 

## Repository content

The project is stored in GitHub and contains:
- app source code which enables building the app and serving all of its functionalities
- build app stored in ```dist/``` directory for running the app without any build

## Usage

Just...

```
# install dependencies
$ npm install

# run the Proxy Server
$ npm run build
```

Then run the `dist/index.html` in a web browser.
In order to use all functionalities one has to run another server (some kind of Proxy Server) which provides necessary data and services.

Another way for getting the app run is by using the Dev Server.
Instructions for running both the Proxy Server and the Dev Sever are provided below.

### Serving files and RSS feeds (Proxy Server)

In order to run the Proxy Server which serves data and services needed by the app for getting the `verilog.log` file and RSS feeds
one has to run following instructions in the CLI:

```
# install dependencies (if not already done)
$ npm install

# run the Proxy Server
$ npm run serve-proxy
```

The server will available at  `http://localhost:9090` (no port availability check is performed).

## Development 

### Development Setup

```bash
# install dependencies
$ npm install

# build the app for 
$ npm run build

# test
$ npm run test

# prepare resources and run Webpack Dev Server
$ npm dev
```

The server will available at  `http://localhost:8080/webpack-dev-server/index.html` (no port availability check is performed).

### NPM Scripts

- `build` - triggers the full app rebuild (with needed resources and vendor files build) and outputs it into `dist/` directory; the app is than ready to run by opening the `dist/index.html` file in the browser 
- `app` - builds only the app files
- `vendor` - builds the `vendor.js` file containing app JavaScript dependency libs
- `dev` - build all resources and run Webpack Dev Server
- `clean` - clean the `dist/` directory
- `template` - copies `index.html` file/template to `dist/`
- `systemjs` - copies `system.js` library file to `dist/`
- `test` - runs unit tests
- `eslint` - runs EsLint code verification tool on app source files
- `eslint:fix` - runs EsLint with `--fix` option
- `eslint:test` - runs EsLint tool on test source files
- `serve-app` - starts the app's Webpack Dev Server
- `serve-proxy` - starts the Proxy Server (also a Webpack Dev Server with separate configuration)

## TODO:

- functionality of 3rd part of the assignment
- provide tests for parsing utility, html template providers, resource retrieving functionalities
- refactor and prettify the `index.js` file
- provide API for xml parsing (like DOM api) instead of direct jQuery usage in modules
- remove jQuery usage from DOM api (it actually not necessary there)
- provide loader at app start (so that the content does not blink on app start)

