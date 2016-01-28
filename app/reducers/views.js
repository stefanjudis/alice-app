import {
  ADD_VIEW,
  SET_CURRENT_VIEW,
  GO_TO_NEXT_VIEW,
  GO_TO_PREVIOUS_VIEW
} from '../actions/views';
import Immutable from 'immutable';

const viewsIo = require( '../lib/views-io/index' );

let views = Immutable.List( viewsIo.getViews() );

export default function views( state = views, action ) {
  let currentIndex;

  switch ( action.type ) {
    case ADD_VIEW:
      state = state.push( action.value );

      viewsIo.setViews( state.toArray() );

      return state;

////////////////////////////////////////////////////////////////////////////////

    case SET_CURRENT_VIEW:
      state = state.map( ( item ) => {
        item.active = item === action.value;

        return item;
      } );

      viewsIo.setViews( state.toArray() );

      return state;

////////////////////////////////////////////////////////////////////////////////

    case GO_TO_NEXT_VIEW:
      currentIndex;

      state.forEach( ( item, i ) => {
        if ( item.active ) {
          currentIndex = i;

          return false;
        }
      } );

      if ( currentIndex < state.count() - 1 ) {
        currentIndex++;
      }

      state = state.map( ( item, i ) => {
        item.active = i === currentIndex;

        return item;
      } );

      viewsIo.setViews( state.toArray() );

      return state;

////////////////////////////////////////////////////////////////////////////////

    case GO_TO_PREVIOUS_VIEW:
      currentIndex;

      state.forEach( ( item, i ) => {
        if ( item.active ) {
          currentIndex = i;

          return false;
        }
      } );

      if ( currentIndex > 0 ) {
        currentIndex--;
      }

      state = state.map( ( item, i ) => {
        item.active = i === currentIndex;

        return item;
      } );

      viewsIo.setViews( state.toArray() );

      return state;

////////////////////////////////////////////////////////////////////////////////

    default:
      return state;
  }
}
