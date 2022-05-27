import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(selector, { config: { formSelector, inputSelector, submitButtonSelector }, handleSubmit }) {
    super(selector);
    this._form = this._popup.querySelector(formSelector);
    this._formSubmitButton = this._form.querySelector(submitButtonSelector);
    this._inputSelector = inputSelector;
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._handleSubmit = handleSubmit;
  }

  _getInputValues() {
    const inputsValue = {}
    this._form.querySelectorAll(this._inputSelector).forEach(input => {
      return inputsValue[input.name] = input.value;
    })
    return inputsValue
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    })
  }


  renderLoading(isLoading, buttonText) {
    if (isLoading) {
      this._formSubmitButton.disabled = true;
      this._formSubmitButton.textContent = buttonText;
    } else {
      this._formSubmitButton.disabled = false;
      this._formSubmitButton.textContent = buttonText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
