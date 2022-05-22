import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._picture = document.querySelector('.view-photo__image');
        this._pictureTitle = document.querySelector('.view-photo__caption');
    };

    open(link, name) {
        this._picture.src = link;
        this._picture.alt = name;
        this._pictureTitle.textContent = name;
        super.open();
    }
}