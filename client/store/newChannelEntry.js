import axios from 'axios';
import socket from '../socket';

const WRITE_CHANNEL_NAME = 'WRITE_CHANNEL_NAME';

const GET_CHANNEL = 'GET_CHANNEL';

function getChannel (channel) {
  const action = { type: GET_CHANNEL, channel}
  return action;
}

export function writeChannelName (channelName) {
  const action = { type: WRITE_CHANNEL_NAME, channelName }
  return action;
}

function postChannel (channel, history) {
  return function thunk (dispatch) {
    return axios.post('/api/channels', channel)
      .then(res => res.data)
      .then(newChannel => {
        const action = getChannel(newChannel);
        dispatch(action);
        socket.emit('new-channel', newChannel);
        history.push(`/channels/${newChannel.id}`);
      });
    }
}

export default function newChannelEntryReducer (state = '', action) {
  switch (action.type) {
    case WRITE_CHANNEL_NAME:
    return action.channelName
    default:
      return state;
  }
}
