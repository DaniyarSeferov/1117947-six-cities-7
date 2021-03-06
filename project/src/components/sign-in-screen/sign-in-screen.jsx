import React, {useEffect, useState} from 'react';
import Header from '../header/header';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../store/api-actions';
import useForm, {getValidators} from '../../hooks/use-form/use-form';
import {getRequestError} from '../../store/application-process/selectors';
import {deleteSendingError} from '../../store/action';

function SignInScreen() {
  const validators = getValidators();
  const [controls] = useState({
    email: [{
      validator: validators.email,
      error: 'The field does not contain a valid email.',
    }],
    password: [{
      validator: validators.required,
      error: 'Password is required.',
    }],
  });
  const sendError = useSelector(getRequestError);

  const dispatch = useDispatch();

  const onSubmit = (authData) => {
    dispatch(login(authData));
  };

  const formRef = React.useRef(null);
  const formFunctions = useForm(formRef, controls);
  const getValue = formFunctions[0];
  const isValid = formFunctions[2];

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (isValid()) {
      const formValues = getValue();

      onSubmit({
        login: formValues.email,
        password: formValues.password,
      });
    }
  };

  useEffect(() => {
    dispatch(deleteSendingError());
  }, [dispatch]);

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              ref={formRef}
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              {sendError && (
                <p className="request-error" style={{fontSize: '14px', color: 'red'}}>{sendError}</p>
              )}
              <div className="login__input-wrapper form__input-wrapper form-control">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required=""
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper form-control">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required=""
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <button className="locations__item-link" style={{border: 'none'}}>
                <span>Amsterdam</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SignInScreen;
