import './pages/index.css';
import { page, addCard, openPopup, closePopup } from './components/utils';
import { createCard, popupViewPhoto } from './components/card';
import { popupEditProfile, formProfile, editProfile, saveProfile, popupAddPlace, formPlace, closeAddPlace, submitFormPlace } from './components/modal';
import { initialCards } from './components/data'

//загружаем карточки из data.js на страницу
initialCards.forEach(function (object) {
  const initialCard = createCard(object.link, object.name);
  addCard(initialCard);
});

//профиль
const buttonEditProfile = page.querySelector('.profile__button');
const buttonCloseProfile = formProfile.querySelector('.button_type_close');

buttonEditProfile.addEventListener('click', editProfile);

buttonCloseProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

popupEditProfile.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupEditProfile);
  };
});

formProfile.addEventListener('submit', (evt) => { 
  evt.preventDefault();
  saveProfile();
});


//новая карточка
const buttonAddPlace = page.querySelector('.button_type_add');
const buttonCloseFormPlace = formPlace.querySelector('.button_type_close');

buttonAddPlace.addEventListener('click', () => {
  openPopup(popupAddPlace);
});

buttonCloseFormPlace.addEventListener('click', closeAddPlace)

popupAddPlace.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget) {
    closeAddPlace();
  }
})

formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitFormPlace();
})


//просмотр фото карточки
const buttonCloseViewPhoto = page.querySelector('.popup_feature_photo .button_type_close')

buttonCloseViewPhoto.addEventListener('click', () => {
  closePopup(popupViewPhoto);
});

popupViewPhoto.addEventListener('mousedown', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupViewPhoto);
  }
})