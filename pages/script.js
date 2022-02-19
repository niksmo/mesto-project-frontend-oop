const page = document.querySelector('.page');

const content = page.querySelector('.content');


//------добавляем 6 карточек из массива на страницу при загрузке

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//эпик карточка места
function addCard (link, name) {
  const galleryItemTemplate = document.querySelector('#gallery__item').content;
  const galleryList = content.querySelector('.gallery');
  const galleryItem = galleryItemTemplate.querySelector('.gallery__item').cloneNode(true);
  const likeButton = galleryItem.querySelector('.card__like-btn');
  const deleteButton = galleryItem.querySelector('.card__trash-btn');
  const cardPhoto = galleryItem.querySelector('.card__image');

  galleryItem.querySelector('.card__image').src = link;
  galleryItem.querySelector('.card__image').alt = name;
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
  

  galleryList.prepend(galleryItem);
}

//загружаем карточки из массива на страницу
initialCards.forEach(function (object) {
  addCard(object.link, object.name);
});


//-----попап
function openPopup(name) {
  const popup = page.querySelector(`.popup_feature_${name}`);

  popup.classList.add('popup_opened');
};

function closePopup(name) {
  const popup = page.querySelector(`.popup_feature_${name}`);

  popup.classList.remove('popup_opened');
};


//-----редактирование профиля
const profileName = content.querySelector('.profile__name');
const profileMyself = content.querySelector('.profile__about-myself');
const buttonEditProfile = content.querySelector('.profile__button');
const formProfile = page.querySelector('.form_type_profile');
const buttonCloseProfile = formProfile.querySelector('.button_type_close');

//открыть форму профиля
buttonEditProfile.addEventListener('click', () => {
  const nameInput = formProfile.querySelector('.form__item_el_name');
  const myselfInput = formProfile.querySelector('.form__item_el_myself');
  nameInput.value = profileName.textContent;
  myselfInput.value = profileMyself.textContent;
  openPopup('profile');
});

//сохранить форму профиля
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameInput = formProfile.querySelector('.form__item_el_name');
  const myselfInput = formProfile.querySelector('.form__item_el_myself');
  profileName.textContent = nameInput.value;
  profileMyself.textContent = myselfInput.value;
  closePopup('profile');
});

//закрыть форму профиля
buttonCloseProfile.addEventListener('click', () => {
  closePopup('profile');
});


//-----добавление карточки пользователем
const buttonAddPlace = content.querySelector('.button_type_add');
const formPlace = page.querySelector('.form_type_place');
const nameInput = formPlace.querySelector('.form__item_el_name');
const urlInput = formPlace.querySelector('.form__item_el_url');
const buttonCloseFormPlace = formPlace.querySelector('.button_type_close');

//открыть форму
buttonAddPlace.addEventListener('click', () => {
  openPopup('place');
});

//сохранить форму карточки
formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(urlInput.value, nameInput.value);
  closePopup('place');
  nameInput.value = '';
  urlInput.value = '';
})

//закрыть форму добавления карточки
buttonCloseFormPlace.addEventListener('click', () => {
  closePopup('place');
  nameInput.value = '';
  urlInput.value = '';
})


//-----просмотр фотографии
function viewPhoto (src, alt, title) {
  const photo = page.querySelector('.view-photo__image');
  const caption = page.querySelector('.view-photo__caption');

  photo.src = src;
  photo.alt = alt;
  caption.textContent = title;
  openPopup('photo')
}

//закрыть просмотр фотографии
const buttonCloseViewPhoto = page.querySelector('.popup_feature_photo .button_type_close')

buttonCloseViewPhoto.addEventListener('click', () => {
  closePopup('photo');
});