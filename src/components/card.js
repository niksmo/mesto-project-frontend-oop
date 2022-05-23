export const removebleCard = {} //глобальная переменная для удаления  карточки

export default class Card {
    constructor({ data, userId, rendererLike, rendererUnlike, handleImageClick }, config) {
        this._image = data.link;
        this._title = data.name;
        this._owner = data.owner._id;
        this._cardId = data._id;
        this._likes = data.likes;
        this._userId = userId;
        this._rendererLike = rendererLike;
        this._rendererUnlike = rendererUnlike;
        this._handleImageClick = handleImageClick;
        this._templateSelector = config.templateSelector;
        this._cardSelector = config.cardSelector;
        this._likeBtnSelector = config.likeBtnSelector;
        this._activeLikeClass = config.activeLikeClass;
        this._likeCounterSelector = config.likeCounterSelector;
        this._imageSelector = config.imageSelector;
        this._trashBtnSelector = config.trashBtnSelector;
        this._titleSelector = config.titleSelector
    };

    _getElement() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(this._cardSelector)
            .cloneNode(true);
        return cardElement;
    };

    _isLiked() {
        return this._element.querySelector(this._likeBtnSelector).classList.contains(this._activeLikeClass);
    };

    _handleLikeClick() {
        if (this._isLiked()) {
            this._rendererUnlike(this._cardId);
        } else {
            this._rendererLike(this._cardId);
        }
    };

    _handleTrashClick() {
        console.log('Delete card');
        //There should be a function to delete image card
    };

    _setEventListeners() {
        this._element.querySelector(this._likeBtnSelector).addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._element.querySelector(this._imageSelector).addEventListener('click', () => {
            this._handleImageClick(this._image, this._title);
        });

        this._element.querySelector(this._trashBtnSelector).addEventListener('click', () => {
            this._handleTrashClick();
        });
    };

    _activeUserLike() {
        if (this._likes.some(like => like._id === this._userId)) {
            this._element.querySelector(this._likeBtnSelector).classList.add(this._activeLikeClass)
        }
    }

    _renderDeleteCardFeature() {
        if (this._owner !== this._userId) {
            this._element.querySelector(this._trashBtnSelector).remove()
        }
    }

    renderLike({ countOfLikes, liked }) {
        if (liked) {
            this._element.querySelector(this._likeBtnSelector).classList.add(this._activeLikeClass);
        } else {
            this._element.querySelector(this._likeBtnSelector).classList.remove(this._activeLikeClass);
        }

        this._element.querySelector(this._likeCounterSelector).textContent = countOfLikes;
    }

    generate() {
        this._element = this._getElement();
        this._setEventListeners();
        this._element.querySelector(this._imageSelector).src = this._image;
        this._element.querySelector(this._titleSelector).textContent = this._title;
        this._element.querySelector(this._likeCounterSelector).textContent = this._likes.length;
        this._activeUserLike();
        this._renderDeleteCardFeature();
        return this._element;
    }

}


// import { openPopup } from "./utils";
// import { popupDeleteCard } from "./modal";
// import { deleteLike, putLike } from "./Api";
// const galleryItemTemplate = document.querySelector('#gallery__item').content;
// const popupViewPhoto = document.querySelector('.popup_feature_photo');
// const photo = document.querySelector('.view-photo__image');
// const caption = document.querySelector('.view-photo__caption');

//показать лайки пользователя
// function containsClientLikes(likes, clientId) {
//     const result = likes.some((like) => {
//         return like._id === clientId;
//     })
//     return result
// }

// function renderLikes(counter, button, likes, clientId) {
//     if (containsClientLikes(likes, clientId)) {
//         button.classList.add('card__like-btn_active')
//     } else {
//         button.classList.remove('card__like-btn_active')
//     }
//     counter.textContent = likes.length;
// }



// //создать карточку из шаблона
// function createCard(link, name, likes, ownerId, clientId, cardId) {
//     const galleryItem = galleryItemTemplate.querySelector('.gallery__item').cloneNode(true);
//     const likeButton = galleryItem.querySelector('.card__like-btn');
//     const deleteButton = galleryItem.querySelector('.card__trash-btn');
//     const cardPhoto = galleryItem.querySelector('.card__image');
//     const cardTitle = galleryItem.querySelector('.card__title');
//     const likesCounter = galleryItem.querySelector('.card__like-counter');

//     cardPhoto.src = link;
//     cardPhoto.alt = name;
//     cardTitle.textContent = name;
//     galleryItem.dataset.id = cardId;

//     if (ownerId === clientId) {
//         deleteButton.addEventListener('click', (evt) => {
//             removebleCard.element = evt.currentTarget.closest('.gallery__item')
//             removebleCard.cardId = removebleCard.element.dataset.id
//             openPopup(popupDeleteCard)
//         });
//     } else {
//         deleteButton.remove()
//     }

//     //«лайк»
//     renderLikes(likesCounter, likeButton, likes, clientId);

//     likeButton.addEventListener('click', (evt) => {
//         const cardId = evt.currentTarget.closest('.gallery__item').dataset.id;

//         if (!evt.target.classList.contains('card__like-btn_active')) {
//             putLike(cardId)
//                 .then((res) => {
//                     renderLikes(likesCounter, likeButton, res.likes, clientId);
//                 })
//                 .catch((e) => {
//                     console.log(e);
//                 })
//         } else {
//             deleteLike(cardId)
//                 .then((res) => {
//                     renderLikes(likesCounter, likeButton, res.likes, clientId);
//                 })
//                 .catch((e) => {
//                     console.log(e);
//                 })
//         }
//     });

//     //«просмотр фото»
//     cardPhoto.addEventListener('click', (evt) => {
//         const eventTarget = evt.target;
//         const photoSrc = eventTarget.src;
//         const photoTitle = eventTarget.alt;
//         viewPhoto(photoSrc, photoTitle, photoTitle);
//     });


//     return galleryItem;
// }


// //-----просмотр фотографии карточки
// function viewPhoto(src, alt, title) {
//     photo.src = src;
//     photo.alt = alt;
//     caption.textContent = title;
//     openPopup(popupViewPhoto)
// }


// export { createCard }
