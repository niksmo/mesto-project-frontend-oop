import '../pages/index.css';

import { API_OPTIONS, CARD_CONFIG, VALIDATOR_SETTINGS } from '../utils/constants'

import { makeVisible } from '../utils/utils';

import Api from '../components/Api';

import Card from '../components/Card';

import Section from '../components/Section';

import UserInfo from '../components/UserInfo';

import FormValidator from '../components/FormValidator';

import PopupWithImage from '../components/popupWithImage';

import PopupWithForm from '../components/PopupWithForm';

const api = new Api(API_OPTIONS);
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about-myself'
});


const validatorFormProfile = new FormValidator(VALIDATOR_SETTINGS, '.form_type_profile')
validatorFormProfile.enableValidation();

const validatorFormCard = new FormValidator(VALIDATOR_SETTINGS, '.form_type_place');
validatorFormCard.enableValidation();

const validatorFormAvatar = new FormValidator(VALIDATOR_SETTINGS, '.form_type_avatar');
validatorFormAvatar.enableValidation();

const popupWithImage = new PopupWithImage('.popup_feature_photo');
popupWithImage.setEventListeners();



//edit profile >>>>>>>>>>

const profilePopup = new PopupWithForm(
    '.popup_feature_profile',

    {
        handleSubmit: (inputsValue) => {
            profilePopup.renderLoading(true)
            api.patchProfile(inputsValue)
                //здесь нужно менять текст кнопки и дизейблить ее
                .then(data => {


                    userInfo.setUserInfo(data)

                    profilePopup.close()
                })
                .catch(err => console.log(err))
                .finally(() => profilePopup.renderLoading(false))
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

//<<<<<<<<<<<<<<<<<<<<

//add card >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const addCardPopup = new PopupWithForm(
    '.popup_feature_place', {
        handleSubmit: (inputsValue) => {
            addCardPopup.renderLoading(true);

            api.putNewCard(inputsValue)

            .then(data => {
                const newCard = new Section({
                    data: [data],
                    renderer: (cardDetail) => {
                        // debugger
                        const card = new Card({
                                data: cardDetail,
                                userId: cardDetail.owner._id,
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
                                }
                            }, CARD_CONFIG

                        )

                        const cardElement = card.generate();
                        newCard.addItem(cardElement);

                    }
                }, '.gallery');
                newCard.renderItems();
                addCardPopup.close();
            })

            .catch(err => console.log(err))
                .finally(() => addCardPopup.renderLoading(false))
        }
    }
)
addCardPopup.setEventListeners();
document.querySelector('.button_type_add').addEventListener('click', () => addCardPopup.open())



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
                    },
                    handleImageClick: (link, name) => {
                        popupWithImage.open(link, name)
                    }
                }, CARD_CONFIG);

                const cardElement = card.generate();

                cardList.addItem(cardElement);

            }
        }, '.gallery');

        cardList.renderItems();

    })
    .catch(err => console.log(err))
