import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ViewsActions from '../../actions/views';
import { ipcRenderer } from 'electron';

class IpcMapper extends Component {
  static propTypes = {
    goToNextView     : PropTypes.func.isRequired,
    goToPreviousView : PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.state = {
      eventsAttached : false
    }
  }

  attachEvents() {
    ipcRenderer.on( 'app-navigation-forward', function() {
      this.props.goToNextView();
    }.bind( this ) );

    ipcRenderer.on( 'app-navigation-backward', function() {
      this.props.goToPreviousView();
    }.bind( this ) );

    this.state.eventsAttached = true;
  }

  render() {
    if ( ! this.state.eventsAttached ) {
      this.attachEvents();
    }

    return null;
  }
}


function mapStateToProps( state ) {
  return {};
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( ViewsActions, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( IpcMapper );
