import { useContext, useRef, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { LocalDataContext } from '../../contexts/LocalDataContext';
import { LoginContext } from '../../contexts/LoginContext';
import { LoadingContext } from '../../contexts/LoadingContext';

import { PopupContext } from '../../contexts/PopupContext';

import Popup from '../Main/components/Popup/Popup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function Signin() {
  const { handleUserInfo, handleUserEmail } = useContext(CurrentUserContext);
  const { TokenInfo } = useContext(LocalDataContext);
  const { handleLogin, setIsloggedIn } = useContext(LoginContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { popup, handleOpenPopup } = useContext(PopupContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();

  const [signinData, setSigninData] = useState({ email: '', password: '' });

  const [isValid, setIsValid] = useState({
    validEmail: ' ',
    validPassword: ' ',
  });
  const [errorMessage, setErrorMessage] = useState({
    emailMsg: '',
    passwordMsg: '',
  });
  const [isActive, setIsActive] = useState(false);

  const editInfoTooltipError = {
    title: ' ',
    children: <InfoTooltip isSuccess={false} />,
  };

  const handleEmailChange = (evt) => {
    setSigninData({ ...signinData, email: evt.target.value });
    setIsValid({
      ...isValid,
      validEmail: emailRef.current.validity.valid,
    });
    setErrorMessage({
      ...errorMessage,
      emailMsg: emailRef.current.validationMessage,
    });
    setIsActive(
      emailRef.current.validity.valid && passwordRef.current.validity.valid
    );
  };

  const handlePasswordChange = (evt) => {
    setSigninData({ ...signinData, password: evt.target.value });
    setIsValid({
      ...isValid,
      validPassword: passwordRef.current.validity.valid,
    });
    setErrorMessage({
      ...errorMessage,
      passwordMsg: passwordRef.current.validationMessage,
    });
    setIsActive(
      emailRef.current.validity.valid && passwordRef.current.validity.valid
    );
  };

  async function handleSubimit(evt) {
    evt.preventDefault();
    if (!signinData.email || !signinData.password) {
      handleOpenPopup(editInfoTooltipError);
      return;
    }

    try {
      setIsLoading(true);
      const { token } = await handleLogin(signinData);
      TokenInfo.set(token);
      await handleUserEmail(token);
      await handleUserInfo();
      setIsloggedIn(true);
      const redirectPath = location.state?.from?.pathname || '/';
      navigate(redirectPath);
    } catch (error) {
      handleOpenPopup(editInfoTooltipError);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className='signin'>
      <h2 className='signin__title'>Entrar</h2>
      <form className='form signin__form' onSubmit={handleSubimit}>
        <fieldset className='form__set signin__form-set'>
          <label className='form__field signin__form-field'>
            <input
              className='form__input form__signin-input'
              type='email'
              id='email'
              placeholder='E-mail'
              value={signinData.email}
              onChange={handleEmailChange}
              ref={emailRef}
              required
            ></input>
            <span
              className={`form__error form__signin-error ${
                isValid.validEmail ? `` : `form__error_visible`
              }`}
            >
              {errorMessage.emailMsg}
            </span>
          </label>
          <label className='form__field'>
            <input
              className='form__input form__signin-input'
              type='password'
              id='password'
              placeholder='Senha'
              minLength='8'
              value={signinData.password}
              onChange={handlePasswordChange}
              ref={passwordRef}
              required
            ></input>
            <span
              className={`form__error form__signin-error ${
                isValid.validPassword ? `` : `form__error_visible`
              }`}
            >
              {errorMessage.passwordMsg}
            </span>
          </label>
        </fieldset>
        <button
          type='submit'
          disabled={isLoading || !isActive}
          className={`form__submit-button form__signin-submit-button 
            ${isActive ? `` : `form__signin-submit-button-inactive`}
            ${isLoading ? `form__signin-submit-button-inactive` : ``}
            `}
        >
          Entrar
        </button>
      </form>
      <p className='signin__text'>
        Ainda não é membro?{' '}
        <Link className='signin__link' to={'/signup'}>
          Inscreva-se aqui!
        </Link>
      </p>
      {popup && <Popup title={popup.title}>{popup.children}</Popup>}
    </section>
  );
}

export default Signin;
