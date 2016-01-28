export const ADD_VIEW            = 'ADD_VIEW';
export const SET_CURRENT_VIEW    = 'SET_CURRENT_VIEW';
export const GO_TO_NEXT_VIEW     = 'GO_TO_NEXT_VIEW';
export const GO_TO_PREVIOUS_VIEW = 'GO_TO_PREVIOUS_VIEW';

export function addView( value ) {
  return {
    type  : ADD_VIEW,
    value : value
  };
}

export function setCurrentView( value ) {
  return {
    type  : SET_CURRENT_VIEW,
    value : value
  };
}

export function goToNextView() {
  return {
    type  : GO_TO_NEXT_VIEW,
    value : null
  };
}

export function goToPreviousView() {
  return {
    type  : GO_TO_PREVIOUS_VIEW,
    value : null
  };
}
