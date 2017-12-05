import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, { writeChannelName, postChannel } from '../store';

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleChange: function (evt) {
      let value = evt.target.value;
      dispatch(writeChannelName(value));
    },
    handleSubmit: function (evt) {
      evt.preventDefault();
      let name = evt.target.channelName.value
      dispatch(postChannel({name}, ownProps.history));
      dispatch(writeChannelName(''));
    }
  };
}

// receives state as an argument
const mapStateToProps = function (state) {
  return {
    newChannelEntry: state.newChannelEntry
  }
}

export function NewChannelEntry (props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Create a Channel</label>
        <input className="form-control" type="text" name="channelName" placeholder="Enter channel name" value={props.newChannelEntry} onChange={props.handleChange} />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Create Channel</button>
      </div>
    </form>
  );
}

const newChannelContainer = connect(mapStateToProps, mapDispatchToProps)(NewChannelEntry);
export default newChannelContainer;

/** Write your `connect` component below! **/
