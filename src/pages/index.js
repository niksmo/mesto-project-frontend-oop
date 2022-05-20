import '../pages/index.css';

import { API_OPTIONS, CARD_CONFIG, VALIDATOR_SETTINGS } from '../utils/constants'

import { makeVisible } from '../utils/utils';

import Api from '../components/Api';

import Card from '../components/Card';

import Section from '../components/Section';

import UserInfo from '../components/UserInfo';

import FormValidator from '../components/FormValidator';

import Popup from '../components/Popup';

const api = new Api(API_OPTIONS);
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about-myself'
});

//popup close test
const popup = new Popup('.popup_feature_profile');
popup.open();
console.log('Popup was opened');
popup.setEventListeners();
debugger
popup.close();


const validatorFormProfile = new FormValidator(VALIDATOR_SETTINGS, '.form_type_profile')
validatorFormProfile.enableValidation();

const validatorFormCard = new FormValidator(VALIDATOR_SETTINGS, '.form_type_place');
validatorFormCard.enableValidation();

const validatorFormAvatar = new FormValidator(VALIDATOR_SETTINGS, '.form_type_avatar');
validatorFormAvatar.enableValidation();


Promise.all([
        api.getUser(),
        api.getCards()
    ])
    .then(([user, cards]) => {
        userInfo.setUserInfo(user);
        makeVisible(document.querySelector('.profile__info'));

        const cardList = new Section({
            data: cards,
            renderer: (cardDetail) => {
                const card = new Card({
                    data: cardDetail,
                    userId: user._id,
                    rendererLike: (cardId) => {
                        api.putLike(cardId)
                            .then(data => card.renderLike({ countOfLikes: data.likes.length, liked: true }))
                            .catch(err => console.log(err))
                    },
                    rendererUnlike: (cardId) => {
                        api.deleteLike(cardId)
                            .then(data => card.renderLike({ countOfLikes: data.likes.length, liked: false }))
                            .catch(err => console.log(err))
                    }
                }, CARD_CONFIG);

                const cardElement = card.generate();

                cardList.addItem(cardElement);

            }
        }, '.gallery');

        cardList.renderItems();

    })
    .catch(err => console.log(err))