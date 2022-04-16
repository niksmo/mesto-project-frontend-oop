import './pages/index.css';

import loadCardsOnStartup from './components/utils';
import { createCard, addCard, openPopup, closePopup, profileName, profileMyself, buttonEditProfile, popupEditProfile, formProfile, buttonCloseProfile, nameInput, myselfInput, buttonAddPlace, popupAddPlace, formPlace, placeInput, urlInput, buttonCloseFormPlace, popupViewPhoto, buttonCloseViewPhoto } from './components/script';

//открыть форму профиля
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  myselfInput.value = profileMyself.textContent;
  openPopup(popupEditProfile);
});

//сохранить форму профиля
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileMyself.textContent = myselfInput.value;
  closePopup(popupEditProfile);
});

//закрыть форму профиля
buttonCloseProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

popupEditProfile.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupEditProfile);
  };
}, true);

//открыть форму карточки
buttonAddPlace.addEventListener('click', () => {
  openPopup(popupAddPlace);
});

//сохранить форму карточки
formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = createCard(urlInput.value, placeInput.value);
  newCard
  addCard(newCard);
  closePopup(popupAddPlace);
  placeInput.value = '';
  urlInput.value = '';
})

//закрыть форму добавления карточки
buttonCloseFormPlace.addEventListener('click', () => {
  closePopup(popupAddPlace);
  placeInput.value = '';
  urlInput.value = '';
})

//закрыть просмотр фотографии карточки
buttonCloseViewPhoto.addEventListener('click', () => {
  closePopup(popupViewPhoto);
});