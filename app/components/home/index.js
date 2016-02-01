import React,{ Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import styles from './style.module.css';
import AppView from '../app-view/index';

export default class Home extends Component {

  addDOMListenerToView( webview ) {
    webview.addEventListener( 'dom-ready', () => {
      // debugger;
    } );

    webview.addEventListener( 'new-window', ( event ) => {
      // debugger;

      shell.openExternal( event.url )
    } );

    webview.addEventListener('ipc-message', (event) => {
      // debugger;
      if ( event.channel.type === 'page-click' ) {
        this.app.procResyncMailboxUnread( mailbox.id )
      }
    } );
  }

  renderView( view ) {
    let style = {
      display : view.active ? 'block' : 'none'
    };

    return (
      <li key={ view.id } className={ styles.view } style={ style }>
        <webview
          is
          className={ styles.webview }
          useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36"
          data-id="' + mailbox.id + '"
          src={ view.url }
          partition="persist:' + mailbox.id + '"
          preload="./app/components/home/browser.js"
          ref={ this.addDOMListenerToView }
        ></webview>
      </li>
    );
  }
  render() {
    const { config } = this.props;

    return (
      <main className={ config.get( 'isSidebarToggled' ) ? 'is-sidebarToggled' : '' }>
        <ul className={ styles.views }>
          { this.props.views.map( this.renderView, this ) }
        </ul>
      </main>
    );
  }
}
