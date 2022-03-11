import React, { Component } from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import { Provider, connect } from "react-redux";
import App from "./App";
import { bindActionCreators } from "redux";
import { getMyProfile } from "../actions/authActions";

class Root extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
    };
  }
  async componentDidMount() {
    try {
      await this.props.getMyProfile();
    } catch (err) {
      console.error(err);
    }
    this.setState({ isLoaded: true });
  }
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <App
            user={this.props.auth.user}
            isAuthenticated={!!this.props.auth.user}
            isLoaded={this.state.isLoaded}
          />
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getMyProfile: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getMyProfile: bindActionCreators(getMyProfile, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
