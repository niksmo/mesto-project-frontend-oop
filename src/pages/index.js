import '../pages/index.css';

import { API_OPTIONS, CARD_CONFIG } from '../utils/constants'

import { makeVisible } from '../utils/utils';

import Api from '../components/Api';

import Card from '../components/Card';

import Section from '../components/Section';

import UserInfo from '../components/UserInfo';

const api = new Api(API_OPTIONS);
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about-myself'
});

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