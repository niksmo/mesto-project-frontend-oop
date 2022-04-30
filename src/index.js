import './pages/index.css';
import { page, addCard, openPopup, closePopup,renderTextProfile, makeVisible } from './components/utils';
import { createCard } from './components/card';
import { formProfile, editProfile, saveProfile, popupAddPlace, formPlace, submitFormPlace } from './components/modal';
import { enableValidation } from './components/validate';
import { getUser, getCards } from './components/api';


//загружаем карточки с бэка на страницу


getCards()
.then((data) => {
  data.forEach((item) => {
    const initialCard = createCard(item.link, item.name, item.likes.length);
    addCard(initialCard)
  })
})
.catch((e) => {
  console.log (e)
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

const profileInfo = page.querySelector('.profile__info')
const buttonEditProfile = page.querySelector('.profile__button');

function initProfile() {
  getUser()
  .then((user) => {
    return renderTextProfile(user.name, user.about)
  })
  .finally(() => {
    makeVisible(profileInfo);
  })
  .catch((e) => {
    console.log (e)
  })
}

initProfile() //берем данные профиля с бэка


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