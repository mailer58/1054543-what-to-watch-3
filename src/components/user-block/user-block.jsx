import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAuthorizationStatus} from './../../reducer/user/selectors.js';
import {AuthorizationStatus} from './../../reducer/user/user.js';
import {Screens} from './../../const.js';
import {ActionCreator} from './../../reducer/app-state/app-state.js';
import {getScreen} from '../../reducer/app-state/selectors.js';
import {Link} from "react-router-dom";
import {AppRoute} from '../../const.js';

const UserBlock = (props) => {

  const onAvatarClick = () => {
    if (screen !== Screens.FAVORITE_LIST) {
      const changeScreen = props.changeScreen.bind(null, Screens.FAVORITE_LIST);
      changeScreen();
    }
  };

  return (
    <div className="user-block">
      {props.authorizationStatus === AuthorizationStatus.AUTH ?
        <div className="user-block__avatar">
          <img onClick={onAvatarClick} src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div> : <Link to={AppRoute.SIGN_IN} className="user-block__link">Sign in</Link>
      }
    </div>
  );
};

UserBlock.displayName = `Userblock`;

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizationStatus(state),
    screen: getScreen(state)
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
