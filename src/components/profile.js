import { page } from './utils'

const profileName = page.querySelector('.profile__name');
const profileObout = page.querySelector('.profile__about-myself')

export function renderTextProfile (name, about) {
  profileName.textContent = name;
  profileObout.textContent = about;
}