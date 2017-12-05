import axios from 'axios';
import socket from '../socket';

const UPDATE_NAME = 'UPDATE_NAME';

export function updateName (name) {
  const action = { type: UPDATE_NAME, name };
  return action;
}

export default function nameReducer (state = 'Reggie', action) {
  switch (action.type) {
    case UPDATE_NAME:
      return action.name
    default:
      return state;
  }
}
