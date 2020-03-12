import React, {PureComponent, createRef} from 'react';
import PropTypes from "prop-types";

const TabsList = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEW: `Review`
};

const tabs = Object.values(TabsList);

class Tabs extends PureComponent {
  constructor() {
    super();
    this.state = {
      activeTab: TabsList.OVERVIEW};
    this._onTabClick = this._onTabClick.bind(this);
  }

  _onTabClick(evt) {
    evt.preventDefault();
    const tab = evt.target.dataset.tab;
    this.setState({activeTab: tab});
  }

  render() {
    return (
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {tabs.map((tab, index) => {
            const className = tab === this.state.activeTab ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`;
            return (
              <li key={index} className={className}>
                <a onClick={this._onTabClick} href="#" className="movie-nav__link" data-tab={tab}>{tab}</a>
              </li>);
          })
          }
        </ul>
      </nav>);
  }
}

export default Tabs;
