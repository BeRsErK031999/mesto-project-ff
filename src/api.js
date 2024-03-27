import { renderInitialCards } from "./index.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-10",
  headers: {
    authorization: "c3ad8653-2826-4356-9a74-654ec4ba0e04",
  },
};
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
}
function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(handleResponse)
    .then((userData) => {
      // Проверяем наличие ожидаемых данных
      if (userData && userData._id) {
        return userData;
      } else {
        // Если структура данных не соответствует ожидаемой, выбрасываем ошибку
        throw new Error("Не удалось извлечь ID пользователя из ответа API");
      }
    })
    .catch((error) => {
      console.error("Ошибка при получении данных пользователя:", error);
      throw error; // Перебрасываем ошибку дальше, чтобы можно было обработать её в вызывающем коде
    });
}
// Функция для обновления профиля пользователя
export function updateUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, { // Важно: 'return' здесь
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
  .then(handleResponse); // Функция 'handleResponse' должна возвращать результат обработки JSON.
}

export function addCardToServer(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleResponse);
}

export function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Не удалось удалить карточку на сервере");
      }
      console.log("Карточка успешно удалена с сервера");
      return response.json();
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
    });
}

export function likeCardOnServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
}

export function unlikeCardOnServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}

//Аватар
export function updateAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ avatar: avatarUrl })
  })
  .then(handleResponse);
}