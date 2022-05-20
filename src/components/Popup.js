import { popups } from "../utils/constants";

export default class Popup {
    constructor(selector) {
        this._selector = selector;
        this.popup = document.querySelector(this._selector);
    };

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    };



    open() {
        this.popup.classList.add('popup_opened');
        this.popup.addEventListener('keydown', this._handleEscClose);


    };

    close() {
        this.popup.classList.remove('popup_opened');
        this.popup.removeEventListener('keydown', this._handleEscClose);
    };

    setEventListeners() {
        popups.forEach((popup) => {
                popup.addEventListener('mousedown', (evt) => {
                    if (evt.target.classList.contains('popup_opened')) {
                        this.close()
                    } else if (evt.target.classList.contains('popup__close')) {
                        this.close()
                    }
                })
            }

        )
    };

}