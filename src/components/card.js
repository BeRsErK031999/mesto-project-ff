export function createCard(
  cardData,
  deleteCardCallback,
  likeCardCallback,
  handleCardClickCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", () => handleCardClickCallback(cardImage));

  cardElement.querySelector(".card__title").textContent = cardData.name;

  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count"); 
  likeCount.textContent = cardData.likes.length; // Установка количества лайков

  likeButton.addEventListener("click", () => {
    likeCardCallback(likeButton, cardData._id, (newLikes) => {
      likeCount.textContent = newLikes.length; // Обновление количества лайков при каждом клике
    });
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCardCallback(cardElement));

  return cardElement;
}


export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
