import React from 'react';
import Header from '../header/header';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function NotFoundScreen() {

  return (
    <div className="page page--gray page--not-found">
      <Header />

      <main className="page__main page__main--not-found">
        <div className="page__not-found-container container">
          <section className="not-found">
            <h1 className="login__title">404 Not Found</h1>
            <Link to={AppRoute.ROOT}>Back to Home</Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
