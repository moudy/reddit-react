import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          {this.props.routes}
        </Router>
      </Provider>
    );
  }
}

Root.propTypes = {
  history: React.PropTypes.object.isRequired
};
