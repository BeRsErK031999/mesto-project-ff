import "./styles/index.css";

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
  },
];

function createCard(cardData, deleteCardCallback) {
  // Находим темплейт в документе
  const cardTemplate = document.querySelector("#card-template").content;
  // Клонируем содержимое темплейта
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Устанавливаем значения
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  // Добавляем обработчик на кнопку удаления
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
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
  const placesList = document.querySelector(".places__list");
  cards.forEach((card) => {
    const cardElement = createCard(card, deleteCard);
    placesList.appendChild(cardElement);
  });
}
// Вызов функции для отображения карточек
renderInitialCards(initialCards);
//Попапы
// Функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Находим элементы попапов
const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

// Находим кнопки для открытия и закрытия попапов
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");

// Добавляем обработчики на кнопки открытия попапов
editProfileButton.addEventListener('click', () => {
  // Установка текущих значений профиля в поля формы перед открытием
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(editProfilePopup);
});
addCardButton.addEventListener('click', () => openPopup(addCardPopup));

// Добавляем обработчики на кнопки закрытия попапов
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Добавляем обработчик для открытия попапа с картинкой
document.querySelectorAll('.card__image').forEach((image) => {
  image.addEventListener('click', () => {
      openPopup(imagePopup);
      imagePopup.querySelector('.popup__image').src = image.src;
      imagePopup.querySelector('.popup__image').alt = image.alt;
      imagePopup.querySelector('.popup__caption').textContent = image.alt;
  });
});

//Закрытие попапа кликом на оверлей
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if(event.target === popup) {
      closePopup(popup);
    }
  });
});

//Закрытие попапа нажатием на Esc
function handleEscClose(event) {
  if(event.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if(openedPopup) {
      closePopup(openedPopup);
    }
  }
}

const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description'); 
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

function handleFormSubmit(evt) { // Исправлено имя функции
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup(editProfilePopup);
}

formElement.addEventListener('submit', handleFormSubmit);
