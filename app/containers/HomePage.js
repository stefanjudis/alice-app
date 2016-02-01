import React, { Component, PropTypes } from 'react';
import Home from '../components/home/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ConfigActions from '../actions/config';

export default class HomePage extends Component {
  static propTypes = {
    views  : PropTypes.object.isRequired,
    config : PropTypes.object.isRequired
  };

  render() {
    return (
      <Home
        views={ this.props.views }
        config={ this.props.config}/>
    );
  }
}

function mapStateToProps( state ) {
  return {
    views  : state.views,
    config : state.config
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( { ...ConfigActions }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( HomePage );
