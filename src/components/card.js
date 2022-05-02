import { openPopup } from "./utils";
import { popupDeleteCard } from "./modal";
import { deleteLike, putLike } from "./api";

export const removebleCard = {} //глобальная переменная для удаления карточки

const galleryItemTemplate = document.querySelector('#gallery__item').content;
const popupViewPhoto = document.querySelector('.popup_feature_photo');
const photo = document.querySelector('.view-photo__image');
const caption = document.querySelector('.view-photo__caption');


//показать лайки пользователя
function containsClientLikes (likes, clientId) {
  const result = likes.some((like) => {
    return like._id === clientId;
  })
  return result
}

function renderLikes (counter, button, likes, clientId) {
  if (containsClientLikes(likes, clientId)) {
    button.classList.add('card__like-btn_active')
  } else {
    button.classList.remove('card__like-btn_active')
  }
  counter.textContent = likes.length;
}



//создать карточку из шаблона
function createCard (link, name, likes, ownerId, clientId, cardId) {
  const galleryItem = galleryItemTemplate.querySelector('.gallery__item').cloneNode(true);
  const likeButton = galleryItem.querySelector('.card__like-btn');
  const deleteButton = galleryItem.querySelector('.card__trash-btn');
  const cardPhoto = galleryItem.querySelector('.card__image');
  const cardTitle = galleryItem.querySelector('.card__title');
  const likesCounter = galleryItem.querySelector('.card__like-counter');

  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardTitle.textContent = name;
  galleryItem.dataset.id = cardId;

  if (ownerId === clientId) {
    deleteButton.addEventListener('click', (evt) => {
      removebleCard.element = evt.currentTarget.closest('.gallery__item')
      removebleCard.cardId = removebleCard.element.dataset.id
      openPopup(popupDeleteCard)
    });
  } else {
    deleteButton.remove()
  }

  //«лайк»
  renderLikes(likesCounter, likeButton, likes, clientId);

  likeButton.addEventListener('click', (evt) => {
    const cardId = evt.currentTarget.closest('.gallery__item').dataset.id;

    if (!evt.target.classList.contains('card__like-btn_active')) {
      putLike(cardId)
      .then((res) => {
        renderLikes(likesCounter, likeButton, res.likes, clientId);
      })
      .catch((e) => {
        console.log(e);
      })
    } else {
      deleteLike(cardId)
      .then((res) => {
        renderLikes(likesCounter, likeButton, res.likes, clientId);
      })
      .catch((e) => {
        console.log(e);
      })
    }
  });

  //«просмотр фото»
  cardPhoto.addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    const photoSrc = eventTarget.src;
    const photoTitle = eventTarget.alt;
    viewPhoto (photoSrc, photoTitle, photoTitle);
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


export { createCard }