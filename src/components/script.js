const page = document.querySelector('.page');
const content = page.querySelector('.content');

//-----эпик карточка
const galleryItemTemplate = document.querySelector('#gallery__item').content;
const galleryList = content.querySelector('.gallery');

function createCard (link, name) {
  const galleryItem = galleryItemTemplate.querySelector('.gallery__item').cloneNode(true);
  const likeButton = galleryItem.querySelector('.card__like-btn');
  const deleteButton = galleryItem.querySelector('.card__trash-btn');
  const cardPhoto = galleryItem.querySelector('.card__image');
  const cardTitle = galleryItem.querySelector('.card__title');

  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardTitle.textContent = name;

  //фича «лайк»
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-btn_active');
  });

  //фича «удаление»
  deleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.gallery__item').remove();
  });

  //фича «просмотр фото»
  cardPhoto.addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    const photoSrc = eventTarget.src;
    const photoAlt = eventTarget.alt;
    const photoTitle = eventTarget.nextElementSibling.querySelector('.card__title').textContent;

    viewPhoto (photoSrc, photoAlt, photoTitle);
  });
  
  return galleryItem;
}



function addCard(card) {
  galleryList.prepend(card);
}


//-----попап
function openPopup(popupFeature) {
  popupFeature.classList.add('popup_opened');
};

function closePopup(popupFeature) {
  popupFeature.classList.remove('popup_opened');
};


//-----редактирование профиля
const profileName = content.querySelector('.profile__name');
const profileMyself = content.querySelector('.profile__about-myself');
const buttonEditProfile = content.querySelector('.profile__button');
const popupEditProfile = page.querySelector('.popup_feature_profile')
const formProfile = page.querySelector('.form_type_profile');
const buttonCloseProfile = formProfile.querySelector('.button_type_close');
const nameInput = formProfile.querySelector('.form__item_el_name');
const myselfInput = formProfile.querySelector('.form__item_el_myself');


//-----добавление карточки пользователем
const buttonAddPlace = content.querySelector('.button_type_add');
const popupAddPlace = page.querySelector('.popup_feature_place');
const formPlace = page.querySelector('.form_type_place');
const placeInput = formPlace.querySelector('.form__item_el_name');
const urlInput = formPlace.querySelector('.form__item_el_url');
const buttonCloseFormPlace = formPlace.querySelector('.button_type_close');


//-----просмотр фотографии карточки
const popupViewPhoto = page.querySelector('.popup_feature_photo');
const photo = page.querySelector('.view-photo__image');
const caption = page.querySelector('.view-photo__caption');

function viewPhoto (src, alt, title) {
  photo.src = src;
  photo.alt = alt;
  caption.textContent = title;
  openPopup(popupViewPhoto)
}

//закрыть просмотр фотографии карточки
const buttonCloseViewPhoto = page.querySelector('.popup_feature_photo .button_type_close')

export { createCard, addCard, openPopup, closePopup, profileName, profileMyself, buttonEditProfile, popupEditProfile, formProfile, buttonCloseProfile, nameInput, myselfInput, buttonAddPlace, popupAddPlace, formPlace, placeInput, urlInput, buttonCloseFormPlace, popupViewPhoto, buttonCloseViewPhoto }