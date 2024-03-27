import { likeCardOnServer, unlikeCardOnServer } from '../api.js';
export function createCard(
  cardData,
  deleteCardCallback,
  likeCardCallback,
  handleCardClickCallback,
  currentUserId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Определение элементов карточки
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  // Настройка элементов карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  // Навешивание обработчиков событий
  cardImage.addEventListener("click", () => handleCardClickCallback(cardImage));
  likeButton.addEventListener("click", () => likeCardCallback(cardData, likeButton, likeCount));

  // Проверка владельца карточки и настройка кнопки удаления
  if (cardData.owner._id === currentUserId) {
    deleteButton.classList.add("card__delete-button_visible");
    deleteButton.addEventListener("click", () => {
      // Вызов функции обратного вызова для удаления карточки, передавая ей элемент карточки и идентификатор
      deleteCardCallback(cardElement, cardData._id);
    });
  } else {
    deleteButton.remove(); // Убираем кнопку удаления для чужих карточек
  }

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
