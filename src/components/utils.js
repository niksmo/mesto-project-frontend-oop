const page = document.querySelector('.page');
const galleryList = document.querySelector('.gallery');

const profileName = page.querySelector('.profile__name');
const profileObout = page.querySelector('.profile__about-myself')

//добавить карточку
function addCard(card) {
  galleryList.prepend(card);
}

//открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

//закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//заполнить текст профиля
function renderTextProfile (name, about) {
  profileName.textContent = name;
  profileObout.textContent = about;
}

//отобразаить лайки
function containsClientLikes (likes, clientId) {
  const result = likes.some((like) => {
    return like._id === clientId;
  })
  return result
}

function renderLikes (counter, button, likes, clientId) {
  if (containsClientLikes(likes, clientId)) {
    button.classList.add('card__like-btn_active')
  } else {
    button.classList.remove('card__like-btn_active')
  }
  counter.textContent = likes.length;
}


//отобразить компонент/лоадер
function makeVisible (element) {
  element.style.visibility = 'visible';
}

export { page, addCard, openPopup, closePopup, renderTextProfile, renderLikes, makeVisible}