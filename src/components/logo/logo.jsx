import React from 'react';
import {Link} from "react-router-dom";
import {AppRoute} from './../../const.js';

export const Logo = React.memo(() => {
  return (<div className="logo">
    <Link to={AppRoute.MAIN} className="logo__link">
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Link>
  </div>);
});

Logo.displayName = `Logo`;

