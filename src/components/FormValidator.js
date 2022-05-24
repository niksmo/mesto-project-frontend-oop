export default class FormValidator {
  constructor(config, formSelector){
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._formSelector = formSelector;
  }

  _showInputError(form, inputElement, errorMessage) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(form, inputElement) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }


  _checkInputValidity(form, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(form, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(form, inputElement);
    }
  }


  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState(inputList, submitButton) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _setEventListenters() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));

    this._toggleButtonState(this._inputList, this._submitButton);

    this._inputList.forEach( inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._form, inputElement);
        this._toggleButtonState(this._inputList, this._submitButton);
      })
    })
  }

  enableValidation() {
    this._form = document.querySelector(this._formSelector)
    this._submitButton = this._form.querySelector(this._submitButtonSelector)
    this._setEventListenters();
  }

  resetValidation() {
    const visibleErrors = this._form.querySelectorAll(`.${this._errorClass}`);
    visibleErrors.forEach(element => {
      element.classList.remove(this._errorClass);
    })
    this._inputList.forEach(input => input.classList.remove(this._inputErrorClass));
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }
}
