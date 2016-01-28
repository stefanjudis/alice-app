import React, { Component, PropTypes } from 'react';
import Home from '../components/home/index';
import { connect } from 'react-redux';

export default class HomePage extends Component {
  static propTypes = {
    views    : PropTypes.object.isRequired
  };

  render() {
    return (
      <Home views={ this.props.views }/>
    );
  }
}

function mapStateToProps( state ) {
  return {
    views       : state.views
  };
}

export default connect( mapStateToProps )( HomePage );
