import React, { Component, PropTypes } from 'react';
import Sidebar from '../components/sidebar/index';
import AddViewModal from '../components/add-view-modal/index';
import IpcMapper from '../components/ipc-mapper/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ViewsActions from '../actions/views';

class App extends Component {
  static propTypes = {
    children       : PropTypes.element.isRequired,
    addView        : PropTypes.func.isRequired,
    setCurrentView : PropTypes.func.isRequired,
    views          : PropTypes.object.isRequired
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
    const { addView, views } = this.props;

    return (
      <div>
        <Sidebar
          views={ views }
          addView={ this.openDialog.bind( this ) }
          setCurrentView={ this.setCurrentView.bind( this ) }>
        </Sidebar>

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
    views       : state.views
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( ViewsActions, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
