import {
  TOGGLE_SIDEBAR
} from '../actions/config';
import Immutable from 'immutable';

let config = Immutable.Map(
  {
    isSidebarToggled : false
  }
);


export default function config( state = config, action ) {
  switch ( action.type ) {
    case TOGGLE_SIDEBAR:
      state = state.set( 'isSidebarToggled', ! state.get( 'isSidebarToggled' ) );

      return state;

    default:
      return state;
  };
}
