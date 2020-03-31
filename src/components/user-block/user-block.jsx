import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAuthorizationStatus} from './../../reducer/user/selectors.js';
import {AuthorizationStatus} from './../../reducer/user/user.js';
import {Screens} from './../../const.js';
import {ActionCreator} from './../../reducer/app-state/app-state.js';

export const UserBlock = (props) => {

  const onClick = (func) => {
    return (evt) => {
      evt.preventDefault();
      func();
    };
  };

  const changeScreen = props.changeScreen.bind(null, Screens.SIGN_IN);
  const onLinkClick = onClick(changeScreen);

  return (
    <div className="user-block">
      {props.authorizationStatus === AuthorizationStatus.AUTH ?
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div> : <a onClick ={onLinkClick} href="sign-in.html" className="user-block__link">Sign in</a>
      }
    </div>
  );
};

UserBlock.displayName = `Userblock`;

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizationStatus(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeScreen(screen) {
    dispatch(ActionCreator.changeScreen(screen));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBlock);

UserBlock.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  changeScreen: PropTypes.func.isRequired
};
