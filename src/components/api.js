//Часть функциональности не реализована: отсутствует файл api.js или внутри него не описано более трёх методов

//Цепочка промисов продолжается вне методов api.js благодаря return fetch . Она располагается в методах файла index.js


const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: 'b5011ed4-a731-4745-a185-1e316e913ed1',
    'Content-Type': 'application/json'
  }
}


const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
}


const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
}


const patchProfile = (object) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(object)
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
}

const putNewCard = (object) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'PUT',
    header: config.headers,
    body: JSON.stringify(object)
  })
  .then((res) => {
    if (res.ok) {
      return
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
}

export { getUser, patchProfile, getCards, putNewCard }