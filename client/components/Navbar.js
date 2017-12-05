import React, { Component } from 'react';
import NameEntry from './NameEntry';
import { connect } from 'react-redux';
import store from '../store';

const mapStateToProps = function (state) {
  return {
    newChannelEntry: state.newChannelEntry
  }
}


export const Navbar = (props) => {
  return (
    <nav>
      <h3>{props.newChannelEntry}</h3>
      <NameEntry />
    </nav>
  );
}

const newNavBarContainer = connect(mapStateToProps)(Navbar);
export default newNavBarContainer;
