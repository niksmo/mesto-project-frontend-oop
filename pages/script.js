const page = document.querySelector('.page');

const content = page.querySelector('.content');

const buttonProfile = content.querySelector('.button_type_edit');

const popup = page.querySelector('.popup');

const buttonCloseProfile = page.querySelector('.form__btn_type_close');

const formProfile = popup.querySelector('.form_type_profile');

const profileName = content.querySelector('.profile__name');

const profileMyself = content.querySelector('.profile__about-myself');


function openPopup() {
  popup.classList.add('popup_opened')
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

//Открывает форму редактирования профиля
buttonProfile.addEventListener('click', () => {
  const nameInput = formProfile.querySelector('.form__item_el_name');
  const myselfInput = formProfile.querySelector('.form__item_el_myself');
  nameInput.value = profileName.textContent;
  myselfInput.value = profileMyself.textContent;
  openPopup()
});

//Сохраняет данные в профиль
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameInput = formProfile.querySelector('.form__item_el_name');
  const myselfInput = formProfile.querySelector('.form__item_el_myself');
  profileName.textContent = nameInput.value;
  profileMyself.textContent = myselfInput.value;
  closePopup();
});

buttonCloseProfile.addEventListener('click', closePopup);