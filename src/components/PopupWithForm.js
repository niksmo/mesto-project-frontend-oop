import Popup from './Popup';

export default class PopupWithForm extends Popup {
    constructor(selector, { handleSubmit, handlePrefill }) {
        super(selector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleSubmit = handleSubmit;
        this._handlePrefill = handlePrefill;
    }

    _getInputValues() {
        const inputsValue = {}
        this._form.querySelectorAll('.form__input').forEach(input => {
            return inputsValue[input.name] = input.value;
        })
        return inputsValue
    }

    prefillForm() {
        this._handlePrefill(this._form);
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
        })
    }

    renderLoading(isLoading) {
        const button = this._form.querySelector('.popup__button')
        if (this._form.classList.contains('form_type_place')) {
            if (isLoading) {
                button.disabled = true;
                button.textContent = 'Сохранение...'
            } else {
                button.textContent = 'Создать';
                button.disabled = false;
            }
        } else {
            if (isLoading) {
                button.disabled = true;
                button.textContent = 'Сохранение...'
            } else {
                button.textContent = 'Сохранить';
                button.disabled = false;
            }
        };
    };

    close() {
        super.close();

        this._form.reset();
    }

}
