import React from 'react';
import UserBlock from '../user-block/user-block.jsx';
import {Logo} from '../logo/logo.jsx';

export const PageHeader = () => {
  return (
    <header className="page-header movie-card__head">
      <Logo />
      <UserBlock />
    </header>
  );
};

