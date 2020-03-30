import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation as DataOperation} from '../../reducer/loading-data/loading-data.js';

const TabsList = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEW: `Review`
};

const tabs = Object.values(TabsList);

const Tabs = (props) => {
  const {film, renderScreens, tab, loadComments} = props;
  const loadCommentsBinded = loadComments.bind(null, props.api, film.id);
  const onTabClickInstance = onTabClick.bind(null, film, renderScreens, tab, loadCommentsBinded);
  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {tabs.map((item, index) => {
          const className = item === tab ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`;
          return (
            <li key={index} className={className}>
              <a onClick={onTabClickInstance} href="#" className="movie-nav__link" data-tab={item}>{item}</a>
            </li>);
        })
        }
      </ul>
    </nav>);
};

const onTabClick = (propsFilm, propsRenderScreens, propsTab, loadComments, evt) => {
  evt.preventDefault();
  const activeTab = evt.target.dataset.tab;
  if (activeTab !== propsTab) {
    propsRenderScreens(activeTab, propsFilm);
    if (activeTab === TabsList.REVIEW) {
      loadComments();
    }
  }
};

const mapDispatchToProps = (dispatch) => ({
  loadComments(axiosApi, filmId) {
    dispatch(DataOperation.loadComments(axiosApi, filmId));
  }
});

export default connect(null, mapDispatchToProps)(Tabs);
export {Tabs};

Tabs.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    genre: PropTypes.string,
    released: PropTypes.number,
    reviews: PropTypes.array
  }),
  renderScreens: PropTypes.func,
  tab: PropTypes.string,
  loadComments: PropTypes.func,
  api: PropTypes.func
};


