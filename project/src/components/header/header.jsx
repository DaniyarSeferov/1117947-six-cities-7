import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {logout} from '../../store/api-actions';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthorizationStatus, getStateUser} from '../../store/user/selectors';

function Header() {
  const user = useSelector(getStateUser);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.ROOT}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {authorizationStatus === AuthorizationStatus.AUTH ? (
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      <img src={user.avatarUrl} alt="avatar" />
                    </div>
                    <span className="header__user-name user__name">{user.email}</span>
                  </Link>
                ) : (
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.SIGN_IN}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                )}
              </li>
              {authorizationStatus === AuthorizationStatus.AUTH && (
                <li className="header__nav-item">
                  <Link
                    className="header__nav-link"
                    onClick={(evt) => {
                      evt.preventDefault();

                      logoutUser();
                    }}
                    to='/'
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
