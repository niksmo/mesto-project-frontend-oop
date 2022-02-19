const page = document.querySelector('.page');
const content = page.querySelector('.content');


//-----эпик карточка
function createCard (link, name) {
  const galleryItemTemplate = document.querySelector('#gallery__item').content;
  
  const galleryItem = galleryItemTemplate.querySelector('.gallery__item').cloneNode(true);
  const likeButton = galleryItem.querySelector('.card__like-btn');
  const deleteButton = galleryItem.querySelector('.card__trash-btn');
  const cardPhoto = galleryItem.querySelector('.card__image');

  cardPhoto.src = link;
  cardPhoto.alt = name;
  galleryItem.querySelector('.card__title').textContent = name;

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
  const galleryList = content.querySelector('.gallery');
  galleryList.prepend(card);
}


//загружаем карточки из массива на страницу
initialCards.forEach(function (object) {
  const initialCard = createCard(object.link, object.name);
  initialCard
  addCard(initialCard);
});


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

//открыть форму профиля
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  myselfInput.value = profileMyself.textContent;
  openPopup(popupEditProfile);
});

//сохранить форму профиля
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileMyself.textContent = myselfInput.value;
  closePopup(popupEditProfile);
});

//закрыть форму профиля
buttonCloseProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});


//-----добавление карточки пользователем
const buttonAddPlace = content.querySelector('.button_type_add');
const popupAddPlace = page.querySelector('.popup_feature_place');
const formPlace = page.querySelector('.form_type_place');
const placeInput = formPlace.querySelector('.form__item_el_name');
const urlInput = formPlace.querySelector('.form__item_el_url');
const buttonCloseFormPlace = formPlace.querySelector('.button_type_close');

//открыть форму
buttonAddPlace.addEventListener('click', () => {
  openPopup(popupAddPlace);
});

//сохранить форму карточки
formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = createCard(urlInput.value, placeInput.value);
  newCard
  addCard(newCard);
  closePopup(popupAddPlace);
  placeInput.value = '';
  urlInput.value = '';
})

//закрыть форму добавления карточки
buttonCloseFormPlace.addEventListener('click', () => {
  closePopup(popupAddPlace);
  placeInput.value = '';
  urlInput.value = '';
})


//-----просмотр фотографии
const popupViewPhoto = page.querySelector('.popup_feature_photo');

function viewPhoto (src, alt, title) {
  const photo = page.querySelector('.view-photo__image');
  const caption = page.querySelector('.view-photo__caption');

  photo.src = src;
  photo.alt = alt;
  caption.textContent = title;
  openPopup(popupViewPhoto)
}

//закрыть просмотр фотографии
const buttonCloseViewPhoto = page.querySelector('.popup_feature_photo .button_type_close')

buttonCloseViewPhoto.addEventListener('click', () => {
  closePopup(popupViewPhoto);
});