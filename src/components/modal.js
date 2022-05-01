import { page, addCard, openPopup, closePopup, renderTextProfile } from './utils';
import { createCard, removebleCard } from './card';
import { settings } from '../index';
import { toggleButtonState, checkInputValidity } from './validate';
import { patchProfile, putNewCard, deleteCard } from './api';

//профиль
const profileName = page.querySelector('.profile__name');
const profileMyself = page.querySelector('.profile__about-myself');
const popupEditProfile = page.querySelector('.popup_feature_profile')
const formProfile = page.querySelector('.form_type_profile');
const nameInput = formProfile.querySelector('.form__input_el_name');
const myselfInput = formProfile.querySelector('.form__input_el_myself');

function editProfile() {
  nameInput.value = profileName.textContent;
  myselfInput.value = profileMyself.textContent;
  const inputList = [nameInput, myselfInput];
  const submitBtnProfile = formProfile.querySelector('.form__btn');
  inputList.forEach((input) => {
    checkInputValidity(formProfile, input, settings)
  })
  toggleButtonState(inputList, submitBtnProfile, settings);
  openPopup(popupEditProfile);
}


function saveProfile() {
  const inputData = {
    name: nameInput.value,
    about: myselfInput.value
  }
  patchProfile(inputData)
  .then(() => {
    renderTextProfile(inputData.name, inputData.about)
  })
  .catch((e) => {
    console.log (e)
  })
  closePopup(popupEditProfile)
}

//добавление карточки
const popupAddPlace = page.querySelector('.popup_feature_place');
const formPlace = page.querySelector('.form_type_place');
const placeInput = formPlace.querySelector('.form__input_el_name');
const urlInput = formPlace.querySelector('.form__input_el_url');


function closeAddPlace() {
  closePopup(popupAddPlace);
  const inputList = [placeInput, urlInput];
  const submitBtnPlace = formPlace.querySelector('.form__btn')
  formPlace.reset();
  toggleButtonState(inputList, submitBtnPlace, settings)
}


function submitFormPlace () {
  const cardData = {
    name: placeInput.value,
    link: urlInput.value
  }
  putNewCard(cardData)
  .then((res) => {
    const newCard = createCard(cardData.link, cardData.name, [], res.owner._id, res.owner._id, res._id);
    addCard(newCard);
  })
  .catch((e) => console.log(e))
  closeAddPlace();
}

//подтверждение удаления карточки
const popupDeleteCard = page.querySelector('.popup_feature_delete');

function deleteCardSubmit (evt) {
  evt.preventDefault();
  deleteCard(removebleCard.cardId)
  .then(() => {
    removebleCard.element.remove()
    removebleCard.element = undefined;
    removebleCard.cardId = undefined;
    closePopup(popupDeleteCard);
  })
  .catch((e) => {
    console.log(e)
  })
}


export { popupEditProfile, formProfile, editProfile, saveProfile, popupAddPlace, formPlace, closeAddPlace, submitFormPlace, popupDeleteCard, deleteCardSubmit }