import React, { Component, PropTypes } from 'react';
import styles from './style.module.css';
import Scraper from 'images-scraper';

export default class ImagePicker extends Component {
  addView() {
    this.props.addView();
  }


  renderImageItem( view ) {
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

  scrapeIt() {
    googleImages.list( {
        keyword: 'banana',
        num: 10,
        detail: true,
        nightmare: {
            show: false
        }
    } )
    .then(function (res) {
        console.log('first 10 results from google', res);
    } ).catch(function(err) {
        console.log('err', err);
    } );
  }

  render() {
    const { addView, views } = this.props;

    return (
      <button onClick={ this.scrapeIt.bind( this ) } type="button">Look for images</button>
    );
  }
}
