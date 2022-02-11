let page = document.querySelector('.page');

let content = page.querySelector('.content');

let buttonProfile = content.querySelector('.button_type_edit');

let popup = page.querySelector('.popup');

let buttonCloseProfile = page.querySelector('.form__btn_type_close');

let profileName = content.querySelector('.profile__name');

let profileMyself = content.querySelector('.profile__about-myself');

function editProfile() {
  popup.classList.add('popup_opened')
}

function closeProfile() {
  popup.classList.remove('popup_opened')
}

let formProfile = popup.querySelector('.form_type_profile');

function saveProfile (evt) {
  evt.preventDefault();
  let nameInput = popup.querySelector('.form__item_el_name');
  let myselfInput = popup.querySelector('.form__item_el_myself');
  profileName.textContent = `${nameInput.value}`;
  profileMyself.textContent = `${myselfInput.value}`;
  closeProfile();
}

formProfile.addEventListener('submit', saveProfile);

buttonProfile.addEventListener('click', editProfile);

buttonCloseProfile.addEventListener('click', closeProfile);