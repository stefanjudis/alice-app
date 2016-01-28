import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './style.module.css';

class AppView extends Component {
  static propTypes = {};

  render() {
    return (
      <main>
        <webview
          className="styles.webview"
          data-id="' + mailbox.id + '"
          src={ this.props.view.url }
          partition="persist:' + mailbox.id + '"
          preload="./js/sniff/clicklisten"
          autosize="on"
        ></webview>'
      </main>
    );
  }
}

export default AppView;
