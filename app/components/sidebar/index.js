import React, { Component, PropTypes } from 'react';
import styles from './style.module.css';

export default class Sidebar extends Component {
  addView() {
    this.props.addView();
  }


  renderViewItem( view ) {
    return (
      <li key={ view.id } className={ styles.viewItem }>
        <button
          className={ styles.viewItemBtn + ' ' + ( view.active ? styles[ 'is-active' ] : '' ) }
          onClick={ this.props.setCurrentView.bind( null, view ) }>
          { view.name[ 0 ] }
        </button>
      </li>
    );
  }

  render() {
    const { addView, views } = this.props;

    return (
      <aside className={ styles.container }>
        <h1>Alice</h1>
        <ul className={ styles.views }>
          { views.map( this.renderViewItem, this ) }
        </ul>

        <button onClick={ this.addView.bind( this ) }>Add view</button>
      </aside>
    );
  }
}
