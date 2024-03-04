export function createCard(cardData, deleteCardCallback, likeCardCallback) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeCardCallback(likeButton);
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    deleteCardCallback(cardElement);
  });

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
