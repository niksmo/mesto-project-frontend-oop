
export const removebleCard = {} //глобальная переменная для удаления карточки


export default class Card {
    constructor({ data, rendererLike, rendererUnlike }, selector) {
        this._image = data.link;
        this._title = data.name;
        this._owner = data.owner._id;
        this._cardId = data._id;
        this._likes = data.likes; //про этот я забыл
        this._rendererLike = rendererLike;
        this._rendererUnlike = rendererUnlike;
        this._selector = selector;
    };
    
    _getElement() {
        const cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.gallery__item')
        .cloneNode(true);
        return cardElement;
    };
    
    _isLiked() {
        return this._element.querySelector('.card__like-btn').classList.contains('card__like-btn_active')
        
    }

    _handleLikeClick() {
        if (this._isLiked()) {
            this._rendererUnlike(this._cardId);
        } else {
            this._rendererLike(this._cardId);
        }
    };
    
    _handleImageClick() {
        console.log('Open Image Popup')
        //There should be a function to open image popup
    };
    
    _handleTrashClick() {
        console.log('Delete card');
        //There should be a function to delete image card
    };
    
    _setEventListeners() {
        this._element.querySelector('.card__like-btn').addEventListener('click', () => {
            this._handleLikeClick()
        });
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleImageClick();
        });
        this._element.querySelector('.card__trash-btn').addEventListener('click', () => {
            this._handleTrashClick();
        });
    };
    
    renderLike({ likes, liked }) {
        if (liked) {
            this._element.querySelector('.card__like-btn').classList.add('card__like-btn_active');
        } else {
            this._element.querySelector('.card__like-btn').classList.remove('card__like-btn_active');
        }
        
        this._element.querySelector('.card__like-counter').textContent = likes;
    }

    generate() {
        this._element = this._getElement();
        this._setEventListeners();
        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__title').textContent = this._title;
        this._element.querySelector('.card__like-counter').textContent = this._likes.length;

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