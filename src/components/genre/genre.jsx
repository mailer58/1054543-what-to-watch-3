import React from 'react';
import PropTypes from "prop-types";

export const Genre = React.memo(({isActive, genre, onLinkClick}) => {

  const className = isActive ? `catalog__genres-item catalog__genres-item--active`
    : `catalog__genres-item`;

  return (
    <li className={className}>
      <a onClick={onLinkClick} href="#" className="catalog__genres-link">{genre}</a>
    </li>);
});

Genre.displayName = `Genre`;

Genre.propTypes = {
  isActive: PropTypes.bool.isRequired,
  genre: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func.isRequired,
};
