const page = document.querySelector('.page');

const content = page.querySelector('.content');


//------добавляем 6 карточек из массива на страницу при загрузке-------

//карточки
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

function createForm (formName, title, inputName, inputNamePlaceholder, inputElse, inputElsePlaceholder, buttonText) {
  const templateForm = document.querySelector('#form').content;
  const popupContainer = document.querySelector('.popup__container');
  const form = templateForm.querySelector('.form').cloneNode(true);
  const formTitle = form.querySelector('.form__heading');
  const formItems = form.querySelectorAll('.form__item');
  const formButton = form.querySelector('.form__btn_type_save');
  form.classList.add(`form_type_${formName}`);
  form.name = formName;
  formTitle.textContent = title;
  formItems[0].classList.add(`form__item_el_${inputName}`);
  formItems[0].name = inputName;
  formItems[0].placeholder = inputNamePlaceholder;
  formItems[1].classList.add(`form__item_el_${inputElse}`);
  formItems[1].name = inputElse;
  formItems[1].name = inputElsePlaceholder;
  formButton.textContent = buttonText
  popupContainer.append(form);
}

const buttonProfile = content.querySelector('.button_type_edit');

const profileName = content.querySelector('.profile__name');

const profileMyself = content.querySelector('.profile__about-myself');

//открываем форму редактирования профиля
buttonProfile.addEventListener('click', () => {
  if (!page.querySelector('.form_type_profile')) {
    createForm ('profile', 'Редактировать профиль', 'name', 'Имя', 'myself', 'О себе', 'Сохранить');
    
    const formProfile = page.querySelector('.form_type_profile');
    const buttonCloseProfile = page.querySelector('.form__btn_type_close');
    
    formProfile.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const nameInput = formProfile.querySelector('.form__item_el_name');
      const myselfInput = formProfile.querySelector('.form__item_el_myself');
      profileName.textContent = nameInput.value;
      profileMyself.textContent = myselfInput.value;
      closePopup();
    });
    
    buttonCloseProfile.addEventListener('click', closePopup);
  };
  const nameInput = page.querySelector('.form__item_el_name');
  const myselfInput = page.querySelector('.form__item_el_myself');
  nameInput.value = profileName.textContent;
  myselfInput.value = profileMyself.textContent;
  openPopup()
});

//навести порядок>>>>>>>


const popup = page.querySelector('.popup');

const buttonCloseProfile = page.querySelector('.form__btn_type_close');

const formProfile = page.querySelector('.form_type_profile');


function openPopup() {
  popup.classList.add('popup_opened')
};

function closePopup() {
  popup.classList.remove('popup_opened')
};

/*//открываем форму редактирования профиля
buttonProfile.addEventListener('click', () => {
  const nameInput = formProfile.querySelector('.form__item_el_name');
  const myselfInput = formProfile.querySelector('.form__item_el_myself');
  nameInput.value = profileName.textContent;
  myselfInput.value = profileMyself.textContent;
  openPopup()
});*/

//сохраняем данные в профиль
// formProfile.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const nameInput = formProfile.querySelector('.form__item_el_name');
//   const myselfInput = formProfile.querySelector('.form__item_el_myself');
//   profileName.textContent = nameInput.value;
//   profileMyself.textContent = myselfInput.value;
//   closePopup();
// });

// buttonCloseProfile.addEventListener('click', closePopup);