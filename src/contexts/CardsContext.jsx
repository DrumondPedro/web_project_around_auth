import { createContext, useEffect, useState } from 'react';

import { client } from '../utils/api';

export const CardsContext = createContext();

export function CardsProvider({ children }) {
  const [cards, setCards] = useState([]);

  async function handleInitialCards() {
    try {
      const data = await client.getInitialCards('/cards');
      setCards(data);
    } catch (error) {
      console.log('GET - /cards -', error);
      setCards([]);
    }
  }

  async function handleCardCreation(newCardData) {
    try {
      const newCard = await client.addNewCard(newCardData, '/cards');
      setCards([newCard, ...cards]);
    } catch (error) {
      console.log('POST - /cards -', error);
    }
  }

  async function handleCardLike(id, executor) {
    try {
      const cardLiked = await client.like(`/cards/${id}/likes`);
      executor(cardLiked);
    } catch (error) {
      console.log(`PUT - /cards/${id}/likes -`, error);
    }
  }

  async function handleCardDisike(id, executor) {
    try {
      const cardDesliked = await client.dislike(`/cards/${id}/likes`);
      executor(cardDesliked);
    } catch (error) {
      console.log(`DELETE - /cards/${id}/likes -`, error);
    }
  }

  async function handleCardDelete(selectedCardId) {
    try {
      await client.deleteCard(`/cards/${selectedCardId}`);
      setCards(cards.filter((card) => card._id !== selectedCardId));
    } catch (error) {
      console.log(`DELETE - /cards/${selectedCardId} -`, error);
    }
  }

  useEffect(() => {
    handleInitialCards();
  }, []);

  return (
    <CardsContext.Provider
      value={{
        cards,
        handleCardCreation,
        handleCardLike,
        handleCardDisike,
        handleCardDelete,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}
