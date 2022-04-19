import './pages/index.css';
import { page, addCard, openPopup, closePopup } from './components/utils';
import { createCard, popupViewPhoto } from './components/card';
import { popupEditProfile, formProfile, editProfile, saveProfile, popupAddPlace, formPlace, closeAddPlace, submitFormPlace } from './components/modal';
import { initialCards } from './components/data';
import { enableValidation } from './components/validate';


//загружаем карточки из data.js на страницу
initialCards.forEach(function (object) {
  const initialCard = createCard(object.link, object.name);
  addCard(initialCard);
});

const popups = page.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    } else if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})


//профиль
const buttonEditProfile = page.querySelector('.profile__button');

buttonEditProfile.addEventListener('click', editProfile);

formProfile.addEventListener('submit', (evt) => { 
  evt.preventDefault();
  saveProfile();
});


//новая карточка
const buttonAddPlace = page.querySelector('.button_type_add');

buttonAddPlace.addEventListener('click', () => {
  openPopup(popupAddPlace);
});

formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitFormPlace();
})


//валидация форм
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(settings);