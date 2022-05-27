import '../pages/index.css';

import { API_OPTIONS, CARD_CONFIG, VALIDATOR_SETTINGS, POPUP_WITH_FORM_CONFIG } from '../utils/constants';

import { makeVisible } from '../utils/utils';

import Api from '../components/Api';

import Card from '../components/Card';

import Section from '../components/Section';

import UserInfo from '../components/UserInfo';

import FormValidator from '../components/FormValidator';

import PopupWithImage from '../components/popupWithImage';

import PopupWithForm from '../components/PopupWithForm';


const api = new Api(API_OPTIONS);


const validatorFormProfile = new FormValidator(VALIDATOR_SETTINGS, '.form_type_profile')
validatorFormProfile.enableValidation();

const validatorFormCard = new FormValidator(VALIDATOR_SETTINGS, '.form_type_place');
validatorFormCard.enableValidation();

const validatorFormAvatar = new FormValidator(VALIDATOR_SETTINGS, '.form_type_avatar');
validatorFormAvatar.enableValidation();


const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about-myself',
  avatarSelector: '.profile__avatar'
});


//createCard function
function createCard(item, userId) {
  const card = new Card({
    data: item,
    userId: userId,
    rendererLike: (cardId) => {
      api.putLike(cardId)
     .then(data => card.renderLike({ countOfLikes: data.likes.length, liked: true }))
     .catch(err => console.log(err))
   },
   rendererUnlike: (cardId) => {
     api.deleteLike(cardId)
     .then(data => card.renderLike({ countOfLikes: data.likes.length, liked: false }))
     .catch(err => console.log(err))
   },
   handleImageClick: (link, name) => {
     popupWithImage.open(link, name)
   },
   handleDeleteClick: (cardId) => {
     sessionStorage.setItem('deletingCard', cardId)
     popupWithCardDelete.open();
   }
  }, CARD_CONFIG);

  return card.generate()
}


const cardList = new Section({
  items: [],
  renderer: (items) => {
    const createdItems = Array.from(items).map(item => {
      return createCard(item, sessionStorage.getItem('userId'))
    });
    createdItems.forEach(item => cardList.addItem(item));
  }
}, '.gallery');


//loading elements on page from server
Promise.all([
  api.getUser(),
  api.getCards()
])
.then(([user, cards]) => {
  sessionStorage.setItem('userId', user._id);

  userInfo.setUserInfo(user);
  userInfo.setUserAvatar(user.avatar);
  makeVisible(document.querySelector('.profile__info'));

  cardList.renderItems(cards);

})
.catch(err => console.log(err))


//view card photo
const popupWithImage = new PopupWithImage('.popup_feature_photo');
popupWithImage.setEventListeners();


//deleting card
const popupWithCardDelete = new PopupWithForm('.popup_feature_delete', {
  config: POPUP_WITH_FORM_CONFIG,
  handleFormReset: () => {},
  handleSubmit: () => {
    const deletingElement = document.querySelector(`[data-card-id='${sessionStorage.getItem('deletingCard')}']`)
    popupWithCardDelete.renderLoading(true, 'Удаление...')
    api.deleteCard(sessionStorage.getItem('deletingCard'))
    .then(() => {
      deletingElement.remove();
      popupWithCardDelete.close();
    })
    .catch(err => console.log(err))
    .finally(() => setTimeout(() => popupWithCardDelete.renderLoading(false, 'Да'), 200))
  }
});

popupWithCardDelete.setEventListeners();


//add card
const addCardPopup = new PopupWithForm('.popup_feature_place', {
  config: POPUP_WITH_FORM_CONFIG,
  handleFormReset: () => validatorFormCard.resetValidation(),
  handleSubmit: (inputsValue) => {
    addCardPopup.renderLoading(true, 'Сохранение...');

    api.putNewCard(inputsValue)
    .then(data => {
      const cardElement = createCard(data, sessionStorage.getItem('userId'));
      cardList.addItem(cardElement);
      addCardPopup.close()
    })
    .catch(err => console.log(err))
    .finally(() => {
      addCardPopup.renderLoading(false, 'Создать');
    })
  }
})

addCardPopup.setEventListeners();

document.querySelector('.button_type_add').addEventListener('click', () => addCardPopup.open())


//edit profile
const profilePopup = new PopupWithForm('.popup_feature_profile', {
  config: POPUP_WITH_FORM_CONFIG,
  handleFormReset: () => validatorFormProfile.resetValidation(),
  handleSubmit: (inputsValue) => {
    profilePopup.renderLoading(true, 'Сохранение...')
    api.patchProfile(inputsValue)
    .then(data => {
      userInfo.setUserInfo(data)
      profilePopup.close()
    })
    .catch(err => console.log(err))
    .finally(() => {
      setTimeout(() => { profilePopup.renderLoading(false, 'Сохранить') }, 200);
    })
  },
  handlePrefill: (form) => {
    const profile = userInfo.getUserInfo();
    form.elements.name.value = profile.name;
    form.elements.about.value = profile.about;
  }
})

profilePopup.setEventListeners();

document.querySelector('.profile__button').addEventListener('click', () => {
  profilePopup.prefillForm();
  profilePopup.open();
})


// edit profile avatar
const editAvatarPopup = new PopupWithForm('.popup_feature_avatar', {
  config: POPUP_WITH_FORM_CONFIG,
  handleFormReset: () => validatorFormAvatar.resetValidation(),
  handleSubmit: (inputsValue) => {
    editAvatarPopup.renderLoading(true, 'Cохранение...');
    api.updAvatar(inputsValue)
    .then(res => {
      userInfo.setUserAvatar(res.avatar);
      editAvatarPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      editAvatarPopup.renderLoading(false, 'Сохранить');
    })
  }
})

editAvatarPopup.setEventListeners();

document.querySelector('.profile__avatar').addEventListener('click', () => editAvatarPopup.open());
