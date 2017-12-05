import axios from 'axios';
import socket from '../socket';

// ACTION TYPES
const GET_CHANNEL = 'GET_CHANNEL';
const GET_CHANNELS = 'GET_CHANNELS';

// ACTION CREATORS
export function getChannel (channel) {
  const action = { type: GET_CHANNEL, channel}
  return action;
}

export function getChannels (channels) {
  const action = { type: GET_CHANNELS, channels }
  return action;
}

// THUNKS

export function fetchChannels () {

    return function thunk (dispatch) {
      return axios.get('/api/channels')
        .then(res => res.data)
        .then(channels => {
          const action = getChannels(channels);
          dispatch(action);
        });
    }

  }

export function postChannel (channel, history) {
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

export default function channelsReducer (state = [], action) {
  switch (action.type) {
    case GET_CHANNELS:
      return action.channels;

    case GET_CHANNEL:
      return [...state, action.channel];

    default:
      return state;
  }
}
