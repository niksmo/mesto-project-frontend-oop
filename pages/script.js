const page = document.querySelector('.page');

const content = page.querySelector('.content');


//------добавляем 6 карточек из массива на страницу при загрузке-------

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

function addCardsOnSturtUp (link, name) {
  const galleryItemTemplate = document.querySelector('#gallery__item').content;
  const galleryList = content.querySelector('.gallery');
  const galleryItem = galleryItemTemplate.querySelector('.gallery__item').cloneNode(true);

  galleryItem.querySelector('.card__image').src = link;
  galleryItem.querySelector('.card__image').alt = name;
  galleryItem.querySelector('.card__title').textContent = name;

  galleryList.prepend(galleryItem);
}

//загружаем карточки на страницу
initialCards.forEach(function (object) {
  const link = object.link;
  const name = object.name;
  
  addCardsOnSturtUp(link, name);
});


//-----попап
function openPopup(dest) {
  const popup = page.querySelector(`.popup_dest_${dest}`)
  popup.classList.add('popup_opened')
};

function closePopup(dest) {
  const popup = page.querySelector(`.popup_dest_${dest}`)
  popup.classList.remove('popup_opened')
};


//-----редактирование профиля
const profileName = content.querySelector('.profile__name');
const profileMyself = content.querySelector('.profile__about-myself');
const buttonEditProfile = content.querySelector('.profile__button');
const formProfile = page.querySelector('.form_type_profile');

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
const buttonCloseProfile = formProfile.querySelector('.form__btn_type_close')
buttonCloseProfile.addEventListener('click', () => {
  closePopup('profile');
});


//-----добавление карточки
