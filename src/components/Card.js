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
    return this._element.querySelector(this._likeBtnSelector).classList.contains(this._activeLikeClass);
  };

  _handleLikeClick() {
    if (this._isLiked()) {
      this._rendererUnlike(this._cardId);
    } else {
      this._rendererLike(this._cardId);
    }
  };

  _setEventListeners() {
    this._element.querySelector(this._likeBtnSelector).addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector(this._imageSelector).addEventListener('click', () => {
      this._handleImageClick(this._image, this._title);
    });

    this._element.querySelector(this._trashBtnSelector).addEventListener('click', () => {
      this._handleDeleteClick(this._cardId);
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
    this._element.dataset.cardId = this._cardId;
    this._element.querySelector(this._imageSelector).src = this._image;
    this._element.querySelector(this._titleSelector).textContent = this._title;
    this._element.querySelector(this._likeCounterSelector).textContent = this._likes.length;
    this._activeUserLike();
    this._renderDeleteCardFeature();
    return this._element;
  }

}
