import './styles/index.css';

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];



function createCard(cardData, deleteCardCallback) {
    // Находим темплейт в документе
    const cardTemplate = document.querySelector('#card-template').content;
    // Клонируем содержимое темплейта
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
    // Устанавливаем значения
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
  
    // Добавляем обработчик на кнопку удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {
      deleteCardCallback(cardElement);
    });
  
    return cardElement;
  }
  
  // Функция для удаления карточки
  function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  // Функция для добавления всех карточек из массива в DOM
  function renderInitialCards(cards) {
    const placesList = document.querySelector('.places__list');
    cards.forEach((card) => {
      const cardElement = createCard(card, deleteCard);
      placesList.appendChild(cardElement);
    });
  }

  
  // Вызов функции для отображения карточек
  renderInitialCards(initialCards);
  