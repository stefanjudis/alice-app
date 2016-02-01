import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ViewsActions from '../../actions/views';
import * as ConfigActions from '../../actions/config';
import { ipcRenderer } from 'electron';

class IpcMapper extends Component {
  static propTypes = {
    goToNextView     : PropTypes.func.isRequired,
    goToPreviousView : PropTypes.func.isRequired,
    toggleSidebar    : PropTypes.func.isRequired
  };

  constructor() {
    super();
  }

  componentDidMount() {
    ipcRenderer.on( 'app-sidebar-toggle', function() {
      this.props.toggleSidebar();
    }.bind( this ) );

    ipcRenderer.on( 'app-navigation-forward', function() {
      this.props.goToNextView();
    }.bind( this ) );

    ipcRenderer.on( 'app-navigation-backward', function() {
      this.props.goToPreviousView();
    }.bind( this ) );
  }

  render() {
    return null;
  }
}


function mapStateToProps( state ) {
  return {};
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( { ...ViewsActions, ...ConfigActions }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( IpcMapper );
