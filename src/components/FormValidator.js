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

  _setEventListenters(form) {
    const inputList = Array.from(form.querySelectorAll(this._inputSelector));
    const submitButton = form.querySelector(this._submitButtonSelector);
    
    this._toggleButtonState(inputList, submitButton);
    
    inputList.forEach( inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(form, inputElement);
        this._toggleButtonState(inputList, submitButton);
      })
    })
  }

  enableValidation() {
    this._setEventListenters(document.querySelector(this._formSelector));
  }

}