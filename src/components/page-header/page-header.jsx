import React from 'react';
import UserBlock from '../user-block/user-block.jsx';

export const PageHeader = () => {
  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <a href="main.html" className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <UserBlock />
    </header>
  );
};

