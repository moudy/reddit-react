# Reddit React

A small demo app that renders the front page of reddit using react and related projects.

## Getting started
```bash
git clone git@github.com:moudy/reddit-react.git
cd reddit-react
npm install
npm run dev
```

The app should now be running at http://localhost:8080/

## Overview

### Development Server
[Webpack](https://webpack.github.io/docs/) seems to be the most popular tool the React community uses for building assets. This project uses [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html) for compiling and reloading assets. It is configured in `webpack.config.babel.js`.

### Routing
[react-router@1.0.0-beta4](http://rackt.github.io/react-router/) is used for routing. The project has been going through some changes recently but [sounds like it is pretty stable now](https://twitter.com/ryanflorence/status/638364442342785025).

### Data
[Redux](http://rackt.github.io/redux/) handles application state. [React Redux](https://github.com/rackt/react-redux) provides bindings to react since redux is not react specific. The main ideas behind redux (reducers + flux = redux) are

- your whole application is stored in an object tree inside a single store
- the only way to mutate the state is to emit an action, an object describing what happened.
- to specify how the state tree is transformed by actions, you write pure [reducers](http://rackt.github.io/redux/docs/Glossary.html#reducer).

See [the docs](http://rackt.github.io/redux/docs/introduction/index.html) for more details.

## Folder structure

`app/actions/`  
Action related code. Top level components (containers) import these functions to dispatch actions. Reducers import the `type` constants to route the action to the appropriate reducer.

`app/api/`  
Networking related code. There is on a single `GET` function exported. A bigger app might have more specific helper functions here.

`app/components/`  
Regular React components that are not aware of Redux. These get data and functions passed down from parent container components via `this.props`. A parent component can pass down a function already bound to the Redux dispatcher. This allows a component unaware of Redux to trigger a actions.

If the component hierarchy is really big and it becomes tedious to pass down props through many layers consider using a `context` [wormhole](https://twitter.com/ryanflorence/status/640193433735294976). See [this post](http://jaysoo.ca/2015/06/09/react-contexts-and-dependency-injection/) for more info.

`app/containers/`  
These are top level components that have access to the Redux store (via [react-redux](https://github.com/rackt/react-redux)). I've seen several people refer to these types of components as "Container Components". I'm not 100% sure about the name "Container" but the important part is that there is a distinction between [smart and dumb components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

`app/css/`  
`app.scss` that can import other sass files and gets included in `index.html`. Nothing really new here... but there is a lot of talk about moving to [inline styles](https://www.youtube.com/watch?v=ERB1TJBn32c). [Radium](https://github.com/FormidableLabs/radium) is a pretty nice tool. I think this is a great idea but needs more time/thought. In the meantime css can be used in the regular way, and inline styles can be explored on a component basis.

`app/store/`  
Store related code including reducer functions that transform app state based on actions.

`dist/`  
Running `webpack` will output the complied application here. `NODE_ENV=production webpack` will include hashes in the assets filenames. The contents of this folder could be put in an S3 buckets and the app should work.

`server/`  
Ignore this folder for now. If you have a standard interface for the queries a component needs to make, adding server-side render support should be pretty simple and re-use most of the client applications code (including routing).

