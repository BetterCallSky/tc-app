## Topcoder dashboard

[![Greenkeeper badge](https://badges.greenkeeper.io/BetterCallSky/tc-app.svg)](https://greenkeeper.io/)

Live url [tc-dashboard.com](http://tc-dashboard.com)

## Requirements
* node v6 (https://nodejs.org)

## Configuration
Configuration files are located under `config` dir.  
See Guild https://github.com/lorenwest/node-config/wiki/Configuration-Files

|Name|Description|
|----|-----------|
|`PORT`| The port to listen|
|`API_URL`| The url for Topcoder Dasbhoard API|

## Install dependencies
`npm i`

## Running

|`npm run <script>`|Description|
|------------------|-----------|
|`build`|Build the app|
|`start`|Serves the app in prod mode (use `build` first).|
|`dev`|Start app in the dev mode.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|
