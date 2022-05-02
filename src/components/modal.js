import { page, addCard, openPopup, closePopup, settings, renderTextProfile, loadingFormStart, loadingFormEnd } from './utils';
import { createCard, removebleCard } from './card';
import { toggleButtonState, checkInputValidity } from './validate';
import { patchProfile, putNewCard, deleteCard, updAvatar } from './api';

//профиль
const profileName = page.querySelector('.profile__name');
const profileMyself = page.querySelector('.profile__about-myself');
const popupEditProfile = page.querySelector('.popup_feature_profile')
const formProfile = page.querySelector('.form_type_profile');
const nameInput = formProfile.querySelector('.form__input_el_name');
const myselfInput = formProfile.querySelector('.form__input_el_myself');
const submitBtnProfile = formProfile.querySelector('.form__btn');

function editProfile() {
  nameInput.value = profileName.textContent;
  myselfInput.value = profileMyself.textContent;
  const inputList = [nameInput, myselfInput];
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
  loadingFormStart(submitBtnProfile)
  patchProfile(inputData)
  .then(() => {
    renderTextProfile(inputData.name, inputData.about)
    closePopup(popupEditProfile)
  })
  .catch((e) => {
    console.log (e)
  })
  .finally(() => {
    loadingFormEnd(submitBtnProfile)
  })
}

//аватар
const avatar = page.querySelector('.profile__avatar');
const formAvatar = page.querySelector('.form_type_avatar');
const avatarInputUrl = page.querySelector('.form__input_el_avatar-url');
const popupAvatarEdit = page.querySelector('.popup_feature_avatar');
const submitBtnAvatar = formAvatar.querySelector('.form__btn');

function avatarSubmit (evt) {
  evt.preventDefault();
  const object = {avatar: ''};
  object.avatar = avatarInputUrl.value;
  loadingFormStart(submitBtnAvatar);
  updAvatar(object)
  .then((res) => {
    renderAvatar(res.avatar);
    closePopup(popupAvatarEdit)
    formAvatar.reset()
    toggleButtonState([avatarInputUrl], submitBtnAvatar, settings)
  })
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    loadingFormEnd(submitBtnAvatar, 'Сохранить')
  })
}

function renderAvatar (url) {
  avatar.style.backgroundImage = `url(${url})`;
}



//добавление карточки
const popupAddPlace = page.querySelector('.popup_feature_place');
const formPlace = page.querySelector('.form_type_place');
const placeInput = formPlace.querySelector('.form__input_el_name');
const urlInput = formPlace.querySelector('.form__input_el_url');
const submitBtnPlace = formPlace.querySelector('.form__btn')


function closeAddPlace() {
  closePopup(popupAddPlace);
  const inputList = [placeInput, urlInput];
  formPlace.reset();
  toggleButtonState(inputList, submitBtnPlace, settings)
}


function submitFormPlace () {
  const cardData = {
    name: placeInput.value,
    link: urlInput.value
  }
  loadingFormStart(submitBtnPlace);
  putNewCard(cardData)
  .then((res) => {
    const newCard = createCard(cardData.link, cardData.name, [], res.owner._id, res.owner._id, res._id);
    addCard(newCard);
    closeAddPlace();
  })
  .catch((e) => console.log(e))
  .finally(() => {
    loadingFormEnd(submitBtnPlace, 'Создать');
  })
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


export { 
  popupEditProfile, 
  formProfile,
  editProfile,
  saveProfile,
  popupAddPlace, 
  formPlace, 
  closeAddPlace, 
  submitFormPlace, 
  popupDeleteCard, 
  deleteCardSubmit,
  renderAvatar,
  avatar,
  formAvatar,
  avatarSubmit,
  popupAvatarEdit,
}