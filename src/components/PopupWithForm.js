import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit, operationWithInputs) {
    super(selector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleSubmit = handleSubmit; //колбэк сабмита
    this._operationWithInputs = operationWithInputs; //колбэк для операций над инпутами формы (в профиле это предзаполнение, для карточки и аватара это очистка)
  }

  _getInputValues() { //собирает данные всех полей формы в объект и возвращает его
    const inputsValue = {}
    this._form.querySelectorAll('.form__input').forEach(input => {
      return inputsValue[input.name] = input.value;
    })
    return inputsValue
  }

  preparationForm() {
    this._operationWithInputs(this._form)
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    })

  }

}
