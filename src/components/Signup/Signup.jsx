import { useContext, useRef, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { LoginContext } from '../../contexts/LoginContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import { PopupContext } from '../../contexts/PopupContext';

import Popup from '../Main/components/Popup/Popup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function Signup() {
  const { handleRegister } = useContext(LoginContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { popup, handleOpenPopup } = useContext(PopupContext);

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [signupData, setSignupData] = useState({ email: '', password: '' });

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

  const editInfoTooltipSuccess = {
    title: ' ',
    children: <InfoTooltip isSuccess={true} />,
    handleNavigate: () => navigate('/signin'),
  };

  const handleEmailChange = (evt) => {
    setSignupData({ ...signupData, email: evt.target.value });
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
    setSignupData({ ...signupData, password: evt.target.value });
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

    if (!signupData.email || !signupData.password) {
      handleOpenPopup(editInfoTooltipError);
      return;
    }

    try {
      setIsLoading(true);
      await handleRegister(signupData);
      handleOpenPopup(editInfoTooltipSuccess);
    } catch (error) {
      handleOpenPopup(editInfoTooltipError);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className='signup'>
      <h2 className='signup__title'>Inscrever-se</h2>
      <form className='form signup__form' onSubmit={handleSubimit}>
        <fieldset className='form__set signup__form-set'>
          <label className='form__field signup__form-field'>
            <input
              className='form__input form__signup-input'
              type='email'
              id='email'
              placeholder='E-mail'
              value={signupData.email}
              onChange={handleEmailChange}
              ref={emailRef}
              required
            ></input>
            <span
              className={`form__error form__signup-error ${
                isValid.validEmail ? `` : `form__error_visible`
              }`}
            >
              {errorMessage.emailMsg}
            </span>
          </label>
          <label className='form__field'>
            <input
              className='form__input form__signup-input'
              type='password'
              id='password'
              placeholder='Senha'
              minLength='8'
              value={signupData.password}
              onChange={handlePasswordChange}
              ref={passwordRef}
              required
            ></input>
            <span
              className={`form__error form__signup-error ${
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
          className={`form__submit-button form__signup-submit-button
            ${isActive ? `` : `form__signup-submit-button-inactive`}
            ${isLoading ? `form__signup-submit-button-inactive` : ``}
            `}
        >
          Inscrever-se
        </button>
      </form>
      <p className='signup__text'>
        Já é um membro?{' '}
        <Link className='signup__link' to={'/signin'}>
          Faça o login aqui!
        </Link>
      </p>
      {popup && (
        <Popup title={popup.title} handleNavigate={popup.handleNavigate}>
          {popup.children}
        </Popup>
      )}
    </section>
  );
}

export default Signup;
