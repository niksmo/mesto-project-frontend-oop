export default class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this._profileNameSelector = nameSelector;
        this._profileAboutSelector = aboutSelector;
    };

    getUserInfo() {
        const userInfo = {
            name: this._profileNameElement.textContent,
            about: this._profileAboutElement.textContent
        };
        return userInfo;
    };

    setUserInfo({ name, about }) {

        this._profileNameElement = document.querySelector(this._profileNameSelector);
        this._profileAboutElement = document.querySelector(this._profileAboutSelector);

        this._profileNameElement.textContent = name;
        this._profileAboutElement.textContent = about;
    };

}