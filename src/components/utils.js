import { initialCards } from './data';
import { createCard, addCard } from './script';

//загружаем карточки из массива на страницу
export default initialCards.forEach(function (object) {
  const initialCard = createCard(object.link, object.name);
  initialCard
  addCard(initialCard);
});