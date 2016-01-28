import React, { Component } from 'react';
import styles from './style.module.css';
import Modal from 'react-modal';
import ImagePicker from '../image-picker/index';

export default class Home extends Component {
  constructor( props ) {
    super( props );

    this.customStyles = {
      overlay : {
        position        : 'fixed',
        top             : 0,
        left            : 0,
        right           : 0,
        bottom          : 0,
        backgroundColor : 'rgba(255, 255, 255, 0.75)',
        display         : 'flex',
        alignItems      : 'center',
        justifyContent  : 'center'
      },
      content : {
        position                : 'relative',
        border                  : '1px solid #ccc',
        width                   : '20em',
        background              : 'blue',
        overflow                : 'auto',
        WebkitOverflowScrolling : 'touch',
        outline                 : 'none',
        padding                 : '20px'
      }
    };

    this.fields = [
      {
        type : 'text',
        name : 'name'
      },
      {
        type : 'url',
        name : 'url'
      },
      {
        type : 'file',
        name : 'logo'
      }
    ];
  }

  onSubmit( event ) {
    event.preventDefault();

    this.props.onSubmit( this.props.appView );
  }

  onFieldChange( event ) {
    this.props.appView[ event.target.name ] = event.target.value;
  }

  renderField( field ) {
    return (
      <li key={ field.name }>
        <label>
          <input name={ field.name } type={ field.type } onChange={ this.onFieldChange.bind( this ) } value={ this.props.appView[ field.name ] }></input>
        </label>
      </li>
    );
  }

  render() {
    return (
      <Modal
        isOpen={ this.props.isOpen }
        onRequestClose={ this.props.onRequestClose }
        style={ this.customStyles }>

        <button onClick={ this.props.onClose }>close</button>

        <h1>Set up a new view!</h1>
        <form onSubmit={ this.onSubmit.bind( this ) }>
          <fieldset>
            <ul>
              { this.fields.map( this.renderField, this ) }
            </ul>

            <ImagePicker></ImagePicker>
          </fieldset>

          <button>Yeah do it</button>
        </form>
      </Modal>
    );
  }
}
