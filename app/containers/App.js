import React, { Component, PropTypes } from 'react';
import Sidebar from '../components/sidebar/index';
import AddViewModal from '../components/add-view-modal/index';
import IpcMapper from '../components/ipc-mapper/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ViewsActions from '../actions/views';
import * as ConfigActions from '../actions/config';

class App extends Component {
  static propTypes = {
    children       : PropTypes.element.isRequired,
    addView        : PropTypes.func.isRequired,
    setCurrentView : PropTypes.func.isRequired,
    views          : PropTypes.object.isRequired,
    config         : PropTypes.object.isRequired
  };

  constructor( props ) {
    super( props );

    this.state = {
      addViewDialogOpen : false,
      newAppView        : {}
    };
  }

  addView( appView ) {
    appView.id = this.props.views.count() + 1;

    this.setState( {
      addViewDialogOpen : false,
      newAppView        : {}
    } );

    this.props.addView( appView );
    this.props.setCurrentView( appView );
  }

  setCurrentView( appView ) {
    this.props.setCurrentView( appView );
  }

  openDialog() {
    this.setState( {
      addViewDialogOpen : true
    } );
  }

  closeDialog() {
    this.setState( {
      addViewDialogOpen : false
    } );
  }

  render() {
    const { addView, views, config } = this.props;

    return (
      <div>
        {
          ! config.hasSidebar ?
            (
              <Sidebar
              views={ views }
              isSidebarToggled={ config.get( 'isSidebarToggled' ) }
              addView={ this.openDialog.bind( this ) }
              toggleSidebar={ this.props.toggleSidebar }
              setCurrentView={ this.setCurrentView.bind( this ) }>
              </Sidebar>
            ) : null
        }


        <AddViewModal
          isOpen={ this.state.addViewDialogOpen }
          onClose={ this.closeDialog.bind( this ) }
          onSubmit={ this.addView.bind( this ) }
          appView={ this.state.newAppView }>
        </AddViewModal>

        <IpcMapper></IpcMapper>

        { this.props.children }
        {
          ( () => {
            if ( process.env.NODE_ENV !== 'production' ) {
              const DevTools = require( './DevTools' );
              return <DevTools />;
            }
          } )()
        }
      </div>
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
  return bindActionCreators( { ...ViewsActions, ...ConfigActions }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
