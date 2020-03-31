import React, {PureComponent, createRef} from 'react';
import PropTypes from "prop-types";
import {HiddenTopDiv} from './../hidden-top-div/hidden-top-div.jsx';

class AuthScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.emailRef = createRef();
    this.passwordRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const onSubmit = this.props.login; // login function
    const api = this.props.api;
    const arr = [api, {
      login: this.emailRef.current.value,
      password: this.passwordRef.current.value,
    }];
    evt.preventDefault();
    onSubmit(arr);
  }

  render() {
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
            <form action="#" className="sign-in__form" onSubmit={this.handleSubmit}>
              <div className="sign-in__fields">
                <div className="sign-in__field">
                  <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref={this.emailRef}/>
                  <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
                </div>
                <div className="sign-in__field">
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

export default AuthScreen;

AuthScreen.propTypes = {
  api: PropTypes.func,
  login: PropTypes.func
};

