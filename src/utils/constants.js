export const API_OPTIONS = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: 'b5011ed4-a731-4745-a185-1e316e913ed1',
    'Content-Type': 'application/json'
  }
}

export const CARD_CONFIG = {
  templateSelector: '#gallery__item',
  cardSelector: '.gallery__item',
  likeBtnSelector: '.card__like-btn',
  activeLikeClass: 'card__like-btn_active',
  likeCounterSelector: '.card__like-counter',
  imageSelector: '.card__image',
  trashBtnSelector: '.card__trash-btn',
  titleSelector: '.card__title'
}

export const VALIDATOR_SETTINGS = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const POPUP_WITH_FORM_CONFIG = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button',
}
