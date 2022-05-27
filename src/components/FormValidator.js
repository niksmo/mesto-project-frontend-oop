export default class FormValidator {
    constructor(config, formSelector) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formSelector = formSelector;
        this._form = document.querySelector(this._formSelector);
        this._submitButton = this._form.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }


    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }


    _hasInvalidInput() {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    _setEventListenters() {
        this._toggleButtonState();
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })
        })
    }

    enableValidation() {
        this._setEventListenters();
    };

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