import React from 'react';
import PropTypes from "prop-types";

const TabsList = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEW: `Review`
};

const tabs = Object.values(TabsList);

export const Tabs = ({film, renderScreens, tab}) => {
  const onTabClickInstance = onTabClick.bind(null, film, renderScreens, tab);
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

const onTabClick = (propsFilm, propsRenderScreens, propsTab, evt) => {
  evt.preventDefault();
  const activeTab = evt.target.dataset.tab;
  if (activeTab !== propsTab) {
    propsRenderScreens(activeTab, propsFilm);
  }
};

Tabs.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string,
    genre: PropTypes.string,
    year: PropTypes.number,
    reviews: PropTypes.array
  }),
  renderScreens: PropTypes.func,
  tab: PropTypes.string,
};


