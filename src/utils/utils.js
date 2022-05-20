const page = document.querySelector('.page');
const galleryList = document.querySelector('.gallery');
const profileName = page.querySelector('.profile__name');
const profileObout = page.querySelector('.profile__about-myself')

//валидация форм
const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

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
function renderTextProfile(name, about) {
    profileName.textContent = name;
    profileObout.textContent = about;
}



//отобразить лоадеры
export function makeVisible(element) {
    element.style.visibility = 'visible';
}

function loadingFormStart(button) {
    button.textContent = 'Сохранение...';
    button.disabled = true;
}

function loadingFormEnd(button, text) {
    button.textContent = text;
    button.disabled = false;
}

// export { page, addCard, openPopup, closePopup, settings, renderTextProfile, makeVisible, loadingFormStart, loadingFormEnd }