import '../pages/index.css';

import { API_OPTIONS } from '../utils/constants'

import Api from '../components/Api';

import Card from '../components/Card';

import Section from '../components/Section';

const api = new Api(API_OPTIONS);

api.getCards()
.then(data => {
  const cardList = new Section({
    data: data,
    renderer: (item) => {
      const card = new Card(item, '#gallery__item');
      const cardElement = card.generate();
      cardList.setItem(cardElement);
    }
  },
  '.gallery');

  cardList.renderItems();

})
.catch(e => { console.log(e) })