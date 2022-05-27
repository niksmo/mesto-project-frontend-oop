export default class Card {
    constructor({ data, userId, rendererLike, rendererUnlike, handleImageClick, handleDeleteClick }, config) {
        this._image = data.link;
        this._title = data.name;
        this._owner = data.owner._id;
        this._cardId = data._id;
        this._likes = data.likes;
        this._userId = userId;
        this._rendererLike = rendererLike;
        this._rendererUnlike = rendererUnlike;
        this._handleImageClick = handleImageClick;
        this._handleDeleteClick = handleDeleteClick;
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
        return this._likeBtn.classList.contains(this._activeLikeClass);
    };

    _handleLikeClick() {
        if (this._isLiked()) {
            this._rendererUnlike(this._cardId);
        } else {
            this._rendererLike(this._cardId);
        }
    };

    _setEventListeners() {
        this._likeBtn.addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleImageClick(this._image, this._title);
        });

        this._trashBtn.addEventListener('click', () => {
            this._handleDeleteClick(this._cardId);
        });
    };

    _activeUserLike() {
        if (this._likes.some(like => like._id === this._userId)) {
            this._likeBtn.classList.add(this._activeLikeClass)
        }
    }

    _renderDeleteCardFeature() {
        if (this._owner !== this._userId) {
            this._trashBtn.remove()
        }
    }

    renderLike({ countOfLikes, liked }) {
        if (liked) {
            this._likeBtn.classList.add(this._activeLikeClass);
        } else {
            this._likeBtn.classList.remove(this._activeLikeClass);
        }

        this._likesNumber.textContent = countOfLikes;
    }

    generate() {
        this._element = this._getElement();
        this._likeBtn = this._element.querySelector(this._likeBtnSelector);
        this._cardImage = this._element.querySelector(this._imageSelector);
        this._likesNumber = this._element.querySelector(this._likeCounterSelector);
        this._trashBtn = this._element.querySelector(this._trashBtnSelector);
        this._setEventListeners();
        this._element.dataset.cardId = this._cardId;
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        this._element.querySelector(this._titleSelector).textContent = this._title;
        this._likesNumber.textContent = this._likes.length;
        this._activeUserLike();
        this._renderDeleteCardFeature();
        return this._element;
    }

}