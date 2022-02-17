const page = document.querySelector('.page');

const content = page.querySelector('.content');


//------добавляем 6 карточек и массива на страницу-------

//массив загружаемых карточек при открытии страницы
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

  //копируем шаблон в переменную
  const galleryItem = galleryItemTemplate.querySelector('.gallery__item').cloneNode(true);

  //наполняем созданный элемент контентом
  galleryItem.querySelector('.card__image').src = link;
  galleryItem.querySelector('.card__image').alt = name;
  galleryItem.querySelector('.card__title').textContent = name;

  //добавляем готовый элемент на страницу
  galleryList.prepend(galleryItem);
}

//перебираем все объекты массива и загружаем карточки
initialCards.forEach(function (object) {
  const link = object.link;
  const name = object.name;
  
  addCardsOnSturtUp(link, name);
});


//------попап и редактирование профиля

const buttonProfile = content.querySelector('.button_type_edit');

const popup = page.querySelector('.popup');

const buttonCloseProfile = page.querySelector('.form__btn_type_close');

const formProfile = popup.querySelector('.form_type_profile');

const profileName = content.querySelector('.profile__name');

const profileMyself = content.querySelector('.profile__about-myself');

function openPopup() {
  popup.classList.add('popup_opened')
};

function closePopup() {
  popup.classList.remove('popup_opened')
};

//открываем форму редактирования профиля
buttonProfile.addEventListener('click', () => {
  const nameInput = formProfile.querySelector('.form__item_el_name');
  const myselfInput = formProfile.querySelector('.form__item_el_myself');
  nameInput.value = profileName.textContent;
  myselfInput.value = profileMyself.textContent;
  openPopup()
});

//сохраняем данные в профиль
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameInput = formProfile.querySelector('.form__item_el_name');
  const myselfInput = formProfile.querySelector('.form__item_el_myself');
  profileName.textContent = nameInput.value;
  profileMyself.textContent = myselfInput.value;
  closePopup();
});

buttonCloseProfile.addEventListener('click', closePopup);