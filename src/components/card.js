
import { openPopup } from "./utils";

const galleryItemTemplate = document.querySelector('#gallery__item').content;
const popupViewPhoto = document.querySelector('.popup_feature_photo');
const photo = document.querySelector('.view-photo__image');
const caption = document.querySelector('.view-photo__caption');

//создать карточку из шаблона
function createCard (link, name) {
  const galleryItem = galleryItemTemplate.querySelector('.gallery__item').cloneNode(true);
  const likeButton = galleryItem.querySelector('.card__like-btn');
  const deleteButton = galleryItem.querySelector('.card__trash-btn');
  const cardPhoto = galleryItem.querySelector('.card__image');
  const cardTitle = galleryItem.querySelector('.card__title');

  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardTitle.textContent = name;

  //«лайк»
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-btn_active');
  });

  //«удаление»
  deleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.gallery__item').remove();
  });

  //«просмотр фото»
  cardPhoto.addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    const photoSrc = eventTarget.src;
    const photoAlt = eventTarget.alt;
    const photoTitle = eventTarget.nextElementSibling.querySelector('.card__title').textContent; /* переписать поиск */

    viewPhoto (photoSrc, photoAlt, photoTitle);
  });
  
  return galleryItem;
}


//-----просмотр фотографии карточки
function viewPhoto (src, alt, title) {
  photo.src = src;
  photo.alt = alt;
  caption.textContent = title;
  openPopup(popupViewPhoto)
}

export { createCard, popupViewPhoto }