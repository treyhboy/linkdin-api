# LinkedIn API Integration with OAuth 2.0 & JWT
Small React/NodeJS application to demonstrate how to connect to LinkedIn's API

### Setup

1.  Set up an app on the LinkedIn developer platform (https://developer.linkedin.com/)
2.  Add `http://localhost:8080/api/linkedin/callback` to `Authorized Redirect URLs` in the application settings of your
application on the LinkedIn web platform.
3.  Fill in `Client ID` and `Client Secret` in `/creds/linkedin-api-keys.json` in this project.

### Running application

#### Starting Client

1. `cd client`
2. `yarn install`
3. `yarn start`

#### Starting Server

1. `cd server`
2. `yarn install`
3. `yarn start`

Finally navigate to `http://localhost:3000` in your browser!

### Notable libraries being used
  - React 16.3
  - Redux
  - NodeJS
  - React Router 4
  - Webpack 4
  - JWT
