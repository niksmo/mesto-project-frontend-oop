import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleSubmit = handleSubmit;
  }

  _getInputValues() { //собирает данные всех полей формы.
    const inputsValue = {}
    this._form.querySelectorAll('.form__input').forEach(input => {
      return inputsValue[input.name] = input.value;
    })
    return inputsValue
  }


  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    })

  }

}
