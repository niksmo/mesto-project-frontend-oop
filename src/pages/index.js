import '../pages/index.css';

import { API_OPTIONS } from '../components/constants.js'

import Api from '../components/api.js'

const api = new Api(API_OPTIONS);

api.getCards().then(res => console.log(res))