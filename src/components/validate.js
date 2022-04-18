export function toggleButtonState(inputList, submitButton, settings) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(settings.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(settings.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  })
}

export function checkInputValidity(form, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(form, inputElement, settings);
  }
}

function showInputError(form, inputElement, errorMessage, settings) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(form, inputElement, settings) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
}

function setEventListenters(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const submitButton = form.querySelector(settings.submitButtonSelector);
  
  toggleButtonState(inputList, submitButton, settings);

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', () => {
      checkInputValidity(form, inputElement, settings);
      toggleButtonState(inputList, submitButton, settings);
    })
  })
}

export function enableValidation (settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach(function (form) {
    setEventListenters(form, settings);
  })
}
