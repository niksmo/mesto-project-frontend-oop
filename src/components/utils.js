const page = document.querySelector('.page');
const galleryList = document.querySelector('.gallery');

//добавить карточку
function addCard(card) {
  galleryList.prepend(card);
}

//открыть попап
function openPopup(popupFeature) {
  popupFeature.classList.add('popup_opened');
}

//закрыть попап
function closePopup(popupFeature) {
  popupFeature.classList.remove('popup_opened');
}

export { page, addCard, openPopup, closePopup }