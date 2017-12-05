import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!
const mapStateToProps = (state) => {
  return {
    channels: state.channels,
    messages: state.messages
  }
}


export const ChannelList = (props) => {

  // const { messages } = this.state;

  return (
    <ul>
    {
      props.channels.map(channel => {
        return (
          <li key={channel.id}>
          <NavLink to={`/channels/${channel.id}`} activeClassName="active">
          <span># {channel.name}</span>
          <span className="badge">{props.messages.filter(messages => messages.channelId === channel.id).length}</span>
          </NavLink>
          </li>
        )
      })
    }
    <li>
    <NavLink to="/new-channel">Create a channel...</NavLink>
    </li>
    </ul>
  );
}

const channelListContainer = withRouter(connect(mapStateToProps)(ChannelList))
export default channelListContainer;
/** Write your `connect` component below! **/
