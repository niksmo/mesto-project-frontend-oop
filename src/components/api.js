//Часть функциональности не реализована: отсутствует файл api.js или внутри него не описано более трёх методов

//Цепочка промисов продолжается вне методов api.js благодаря return fetch . Она располагается в методах файла index.js

const url = 'https://nomoreparties.co/v1/plus-cohort-9'

const token = 'b5011ed4-a731-4745-a185-1e316e913ed1'

function getCards() {
  return fetch(`${url}/cards`, {
    headers: {
      authorization: token
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
}

function testGetCards() {
  getCards()
  .then((res) => {
    console.log(res)
  })
}

export { getCards, testGetCards }