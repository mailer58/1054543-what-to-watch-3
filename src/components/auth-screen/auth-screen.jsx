import React, {PureComponent, createRef} from 'react';
import PropTypes from "prop-types";
import {HiddenTopDiv} from './../hidden-top-div/hidden-top-div.jsx';
import {connect} from "react-redux";
import {getSubmitState} from './../../reducer/user/selectors';
import {ActionCreator, SubmitState} from './../../reducer/user/user.js';

class AuthScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isInputEmailError: false,
      isInputPasswordError: false};

    this.emailRef = createRef();
    this.passwordRef = createRef();

    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onSubmit(evt) {
    evt.preventDefault();

    // check email:
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const address = this.emailRef.current.value;
    if (reg.test(address) === false) {
      this.setState({isInputEmailError: true});
      return;
    }

    // check a password:
    if (!this.passwordRef.current.value) {
      this.setState({isInputPasswordError: true});
      return;
    }

    const {login, api} = this.props;
    const arr = [api, {
      login: this.emailRef.current.value,
      password: this.passwordRef.current.value,
    }];

    login(arr);
  }

  onClick() {
    const submitState = this.props.submitState;
    if (submitState === SubmitState.ERROR) {
      this.props.setSubmitState(SubmitState.RESET);
    }
    if (this.state.isInputEmailError) {
      this.setState({isInputEmailError: false});
    }
    if (this.state.isInputPasswordError) {
      this.setState({isInputPasswordError: false});
    }
  }

  render() {
    const submitState = this.props.submitState;

    const emailInputClass = this.state.isInputEmailError ?
      `sign-in__field sign-in__field--error` : `sign-in__field`;

    const passwordInputClass = this.state.isInputPasswordError ?
      `sign-in__field sign-in__field--error` : `sign-in__field`;

    return (
      <React.Fragment>
        <HiddenTopDiv />
        <div className="user-page">
          <header className="page-header user-page__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <h1 className="page-title user-page__title">Sign in</h1>
          </header>

          <div className="sign-in user-page__content">
            <form onClick={this.onClick} action="#" className="sign-in__form" onSubmit={this.onSubmit}>
              {this.state.isInputEmailError ? <div className="sign-in__message">
                <p>Please enter a valid email address</p>
              </div> : null}
              {this.state.isInputPasswordError ? <div className="sign-in__message">
                <p>Please enter a password</p>
              </div> : null}
              {submitState === SubmitState.ERROR ? <div className="sign-in__message">
                <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
              </div> : null}
              <div className="sign-in__fields">
                <div className={emailInputClass}>
                  <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref={this.emailRef}/>
                  <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
                </div>
                <div className={passwordInputClass}>
                  <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={this.passwordRef}/>
                  <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
                </div>
              </div>
              <div className="sign-in__submit">
                <button className="sign-in__btn" type="submit">Sign in</button>
              </div>
            </form>
          </div>

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    submitState: getSubmitState(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  setSubmitState(value) {
    dispatch(ActionCreator.setSubmitState(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

AuthScreen.propTypes = {
  api: PropTypes.func,
  login: PropTypes.func,
  submitState: PropTypes.func,
  setSubmitState: PropTypes.func,
};

