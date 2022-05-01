import './pages/index.css';
import { page, addCard, openPopup, closePopup,renderTextProfile, makeVisible } from './components/utils';
import { createCard } from './components/card';
import { formProfile, editProfile, saveProfile, popupAddPlace, formPlace, submitFormPlace, deleteCardSubmit } from './components/modal';
import { enableValidation } from './components/validate';
import { getUser, getCards } from './components/api';


//загружаем карточки и профиль с бэка на страницу
const profileInfo = page.querySelector('.profile__info')

// export const userId = {id: ''} пока паркую

Promise.all([
  getCards(),
  getUser()
]).then(([cards, user]) => {
  renderTextProfile(user.name, user.about);
  cards.forEach((item) => {
    const initialCard = createCard(item.link, item.name, item.likes, item.owner._id, user._id, item._id);
    addCard(initialCard)
  })
}).catch((e) => {
    console.log(e)
}).finally(() => {
  makeVisible(profileInfo);
})


//закрыть попап
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

//удаление карточки
const formDeleteCard = page.querySelector('.form_type_delete');

formDeleteCard.addEventListener('submit', deleteCardSubmit)

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