export const API_OPTIONS = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: 'b5011ed4-a731-4745-a185-1e316e913ed1',
    'Content-Type': 'application/json'
  }
}

export const galleryItemTemplate = document.querySelector('#gallery__item').content;
export const popupViewPhoto = document.querySelector('.popup_feature_photo');
export const photo = document.querySelector('.view-photo__image');
export const caption = document.querySelector('.view-photo__caption');

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