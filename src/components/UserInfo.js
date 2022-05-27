export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._profileNameElement = document.querySelector(nameSelector);
        this._profileAboutElement = document.querySelector(aboutSelector);
        this._avatarButton = document.querySelector(avatarSelector);
    };

    getUserInfo() {
        const userInfo = {
            name: this._profileNameElement.textContent,
            about: this._profileAboutElement.textContent
        };
        return userInfo;
    };

    setUserInfo({ name, about, avatar }) {
        this._profileNameElement.textContent = name;
        this._profileAboutElement.textContent = about;
        this._avatarButton.style.backgroundImage = `url(${avatar})`;
    };
}
