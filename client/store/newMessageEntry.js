import axios from 'axios';
import socket from '../socket';

const GET_MESSAGE = 'GET_MESSAGE';
const WRITE_MESSAGE = 'WRITE_MESSAGE';

function getMessage (message) {
  const action = { type: GET_MESSAGE, message };
  return action;
}

export function writeMessage (content) {
  const action = { type: WRITE_MESSAGE, content };
  return action;
}

function postMessage (message) {

  return function thunk (dispatch) {
    return axios.post('/api/messages', message)
      .then(res => res.data)
      .then(newMessage => {
        const action = getMessage(newMessage);
        dispatch(action);
        socket.emit('new-message', newMessage);
      });
  }

}

export default function newMessageEntryReducer (state = '', action) {
  switch (action.type) {
    case WRITE_MESSAGE:
      return action.content;
    default:
      return state;
  }
}
