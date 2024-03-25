import { renderInitialCards } from './index.js';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-10',
    headers: {
      authorization: 'c3ad8653-2826-4356-9a74-654ec4ba0e04'
    }
  };
  export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(handleResponse);
  }
  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(handleResponse)
    .then((userData) => {
      console.log("Полученные данные пользователя:", userData); // Вывод в консоль полученных данных
      return userData; // Возвращаем данные пользователя дальше по цепочке промисов
    })
    .catch((error) => {
      console.error(error);
      throw error; 
    }); 
  }
// Функция для обновления профиля пользователя
export function updateUserInfo(name, about) {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(handleResponse)
  .then((updatedUserInfo) => {
    updateProfile(updatedUserInfo);
    closePopup(editProfilePopup); 
  })
  .catch((error) => {
    console.error("Ошибка при обновлении информации пользователя:", error);
  });
}

export function addCardToServer(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(handleResponse);
}



  