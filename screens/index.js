import React from 'react';

import SignIn from './SignIn';
import Volunteer from './Volunteer';
import Organization from './Organization';

import { connect } from "react-redux";

class Screens extends React.Component {
  constructor(props){
    super(props);
  };

  render() {
    if(this.props.isSignedIn)
      return this.props.userType === 'volunteer' ? <Volunteer/> : <Organization/>;
    return <SignIn/>;
  };
};

function mapStateToProps(state) {
  return {
      isSignedIn: state.authReducer.isSignedIn,
      userType: state.authReducer.userType
  };
};

function mapDispatchToProps(dispatch) {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Screens);