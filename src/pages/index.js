import '../pages/index.css';

import { API_OPTIONS } from '../utils/constants'

import Api from '../components/Api';

import Card from '../components/Card';

import Section from '../components/Section';

const api = new Api(API_OPTIONS);

api.getUser().then(res => console.log(res)) //_id: '0616d1591f6e316b3923d6ef'

Promise.all([
  api.getUser(),
  api.getCards()
])
.then(([user, cards]) => {
  const cardList = new Section({
    data: cards,
    renderer: (item) => {
      const card = new Card({
        data: item,
        rendererLike: (cardId) => {
          api.putLike(cardId)
          .then(data => card.renderLike({ likes: data.likes.length, liked: true }))
          .catch(err => console.log(err))
        },
        rendererUnlike: (cardId) => {
          api.deleteLike(cardId)
          .then(data => card.renderLike({ likes: data.likes.length, liked: false }))
          .catch(err => console.log(err))
        }
      }, '#gallery__item')
      
      
      const cardElement = card.generate();

      if (item.likes.some(item => item._id === user._id)) {
        cardElement.querySelector('.card__like-btn').classList.add('card__like-btn_active')
      }

      cardList.setItem(cardElement);

    }
  }, '.gallery')

  cardList.renderItems();
})
.catch(err => console.log(err))