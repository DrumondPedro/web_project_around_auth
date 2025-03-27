import { useContext } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CardsContext } from '../../contexts/CardsContext';
import { PopupContext } from '../../contexts/PopupContext';

import Popup from './components/Popup/Popup';
import EditAvatar from './components/Popup/components/EditAvatar/EditAvatar';
import EditProfile from './components/Popup/components/EditProfile/EditProfile';
import NewCard from './components/Popup/components/NewCard/NewCard';
import Card from './components/Card/Card';

import pencil from '../../assets/images/profile/profile_edit_button.svg';
import plus from '../../assets/images/profile/profile_add_button.svg';

function Main() {
  const { currentUser } = useContext(CurrentUserContext);
  const { cards } = useContext(CardsContext);
  const { popup, handleOpenPopup } = useContext(PopupContext);

  const editAvatarPopup = {
    title: 'Alterar a foto do perfil',
    children: <EditAvatar />,
  };

  const editProfilePopup = {
    title: 'Editar perfil',
    children: <EditProfile />,
  };

  const newCardPopup = {
    title: 'Novo local',
    children: <NewCard />,
  };

  return (
    <main className='content'>
      <section className='profile'>
        <button
          className='profile__picture-edit-button '
          onClick={() => {
            handleOpenPopup(editAvatarPopup);
          }}
        ></button>
        <img
          src={currentUser.avatar}
          alt='Imagem de perfil do usuário.'
          className='profile__picture'
        />
        <div className='profile__personal-information'>
          <div className='profile__personal-title'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              className='profile__edit-button'
              onClick={() => {
                handleOpenPopup(editProfilePopup);
              }}
            >
              <img
                src={pencil}
                alt='Ícone minimalista de um lápis'
                className='profile__edit-button-image'
              />
            </button>
          </div>
          <p className='profile__about'>{currentUser.about}</p>
        </div>
        <button
          className='profile__add-button'
          onClick={() => {
            handleOpenPopup(newCardPopup);
          }}
        >
          <img
            src={plus}
            alt='Ícone de um sinal de mais'
            className='profile__add-button-image'
          />
        </button>
      </section>
      <section className='gallery'>
        <ul className='gallery__cards'>
          {cards.map((card, i) => (
            <Card key={i} card={card}></Card>
          ))}
        </ul>
      </section>
      {popup && <Popup title={popup.title}>{popup.children}</Popup>}
    </main>
  );
}

export default Main;
