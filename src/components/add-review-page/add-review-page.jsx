import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {HiddenTopDiv} from './../hidden-top-div/hidden-top-div.jsx';
import {connect} from "react-redux";
import {getFilm} from './../../reducer/app-state/selectors.js';
import {ActionCreator} from './../../reducer/app-state/app-state.js';
import {Screens} from '../../const.js';
import UserBlock from './../user-block/user-block.jsx';
import AddReviewForm from '../add-review-form/add-review-form.jsx';
import withAddReviewForm from '../../hocs/with-add-review-form/with-add-review-form.jsx';

class AddReviewPage extends PureComponent {
  constructor(props) {
    super(props);
    this.onBreadCrumbClick = this.onBreadCrumbClick.bind(this);
  }

  onBreadCrumbClick(evt) {
    evt.preventDefault();
    this.props.changeScreen(Screens.MAIN);
  }

  render() {
    const AddReviewFormWrapped = withAddReviewForm(AddReviewForm);
    const {
      name,
      posterImage,
      backgroundImage
    } = this.props.currentFilm;
    const altImg = name + ` poster`;
    return (
      <React.Fragment>
        <HiddenTopDiv />
        <section className="movie-card movie-card--full">
          <div className="movie-card__header">
            <div className="movie-card__bg">
              <img src={backgroundImage} alt={name}/>
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header">
              <div className="logo">
                <a href="main.html" className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
              </div>

              <nav className="breadcrumbs">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a onClick ={this.onBreadCrumbClick} href="movie-page.html" className="breadcrumbs__link">{name}</a>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link">Add review</a>
                  </li>
                </ul>
              </nav>
              <UserBlock />
            </header>

            <div className="movie-card__poster movie-card__poster--small">
              <img src={posterImage} alt={altImg} width="218" height="327"/>
            </div>
          </div>

          <div className="add-review">
            <AddReviewFormWrapped api = {this.props.api}/>
          </div>

        </section>

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentFilm: getFilm(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeScreen(screen) {
    dispatch(ActionCreator.changeScreen(screen));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewPage);

AddReviewPage.propTypes = {
  currentFilm: PropTypes.func,
  changeScreen: PropTypes.func,
  api: PropTypes.func
};

