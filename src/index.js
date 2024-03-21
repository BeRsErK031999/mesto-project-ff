import "./styles/index.css";
import { createCard, deleteCard, likeCard } from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import logoSrc from "./images/logo.svg";
import avatarSrc from "./images/avatar.jpg";

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

const profileImageDiv = document.querySelector(".profile__image");
const headerLogo = document.querySelector(".header__logo");
const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const placeLinkInput = document.querySelector(".popup__input_type_url");
const placesList = document.querySelector(".places__list");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const validationSettings = {
  name: {
    minLength: 2,
    maxLength: 40,
    regex: /^[a-zA-Zа-яА-ЯёЁ -]+$/,
    errorMessage:
      "Имя должно содержать только буквы, пробелы или дефисы и быть длиной от 2 до 40 символов.",
  },
  description: {
    minLength: 2,
    maxLength: 200,
    regex: /^[a-zA-Zа-яА-ЯёЁ -]+$/,
    errorMessage:
      "Описание должно содержать только буквы, пробелы или дефисы и быть длиной от 2 до 200 символов.",
  },
  'place-name': {
    minLength: 2,
    maxLength: 30,
    regex: /^[a-zA-Zа-яА-ЯёЁ -]+$/,
    errorMessage: "Название должно содержать только буквы, пробелы или дефисы и быть длиной от 2 до 30 символов."
  },
  'link': {
    regex: /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})$/,
    errorMessage: "Введите корректную ссылку."
  },
};

function updateSaveButtonState(form) {
  // Проверка, что аргумент form передан и не является undefined
  if (!form) {
    console.error("updateSaveButtonState was called without a form element");
    return;
  }

  const saveButton = form.querySelector(".popup__button");
  // Проверка на наличие кнопки сохранения в форме, на случай если селектор неверен
  if (!saveButton) {
    console.error("No save button found in the form");
    return;
  }

  const isFormValid = form.checkValidity();

  saveButton.disabled = !isFormValid;
  saveButton.style.backgroundColor = isFormValid ? '' : '#C4C4C4';
}

function validateInput(inputElement, settings) {
  const value = inputElement.value.trim();
  let errorMessage = "";

  if (value === "") {
    errorMessage = "Вы пропустили это поле";
  } else if (!settings.regex.test(value)) {
    errorMessage = settings.errorMessage;
  } else if (
    value.length < settings.minLength ||
    value.length > settings.maxLength
  ) {
    errorMessage = `Длина должна быть от ${settings.minLength} до ${settings.maxLength} символов.`;
  }

  inputElement.setCustomValidity(errorMessage);
  inputElement.nextElementSibling.textContent = errorMessage;
  inputElement.nextElementSibling.style.color = errorMessage ? "red" : ""; // Устанавливаем красный цвет текста ошибки
  updateSaveButtonState(); // Обновить состояние кнопки после валидации
}

document.querySelectorAll('.popup__input').forEach(input => {
  input.addEventListener('input', function() {
    const form = input.closest('.popup__form'); // Находим ближайшую форму к элементу ввода
    const settings = validationSettings[input.name];
    if (settings) {
      validateInput(input, settings);
      updateSaveButtonState(form); // Передаём найденную форму
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  headerLogo.src = logoSrc;
  if (profileImageDiv) {
    profileImageDiv.style.backgroundImage = `url('${avatarSrc}')`;
  }
  renderInitialCards(initialCards);
  updateSaveButtonState(formElement); // Для формы редактирования профиля
  updateSaveButtonState(addCardForm); // Для формы добавления новой карточки
});

function renderInitialCards(cards) {
  cards.forEach((card) => {
    const cardElement = createCard(card, deleteCard, likeCard, handleCardClick);
    placesList.appendChild(cardElement);
  });
}

editProfileButton.addEventListener("click", () => {
  // Сброс сообщений об ошибке
  const errorElements = document.querySelectorAll(".popup__input-error");
  errorElements.forEach((element) => {
    element.textContent = ""; // Очищаем текст ошибок
    updateSaveButtonState();
  });

  // Сброс customValidity для каждого поля ввода
  const inputElements = document.querySelectorAll(".popup__input");
  inputElements.forEach((input) => {
    input.setCustomValidity(""); // Сбрасываем customValidity
  });

  // Загрузка текущих значений профиля в поля ввода
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  // Открытие модального окна
  openPopup(editProfilePopup);
});

addCardButton.addEventListener("click", () => openPopup(addCardPopup));

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

formElement.addEventListener("submit", handleFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault(); // Предотвращаем стандартное поведение формы
  // Валидация полей
  validateInput(nameInput, validationSettings["name"]);
  validateInput(jobInput, validationSettings["description"]);
  // Проверяем, валидны ли оба поля
  const isNameValid = nameInput.checkValidity();
  const isJobValid = jobInput.checkValidity();
  // Если оба поля валидны, обновляем профиль и закрываем форму
  if (isNameValid && isJobValid) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(editProfilePopup);
  }
  // Обновляем тексты ошибок (если элементы ошибок уже добавлены в HTML)
  document.querySelector(".name-input-error").textContent =
    nameInput.validationMessage;
  document.querySelector(".description-input-error").textContent =
    jobInput.validationMessage;
}

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  validateInput(placeNameInput, validationSettings['place-name']);
  validateInput(placeLinkInput, validationSettings['link']);
  if (placeNameInput.checkValidity() && placeLinkInput.checkValidity()) {
    const newCard = createCard(
      { name: placeNameInput.value, link: placeLinkInput.value },
      deleteCard,
      likeCard,
      handleCardClick
    );
    placesList.prepend(newCard);
    closePopup(addCardPopup);
    addCardForm.reset();
    updateSaveButtonState(addCardForm); // Сбросить состояние кнопки после закрытия формы
  }}


function handleCardClick(imageElement) {
  openPopup(imagePopup);
  popupImage.src = imageElement.src;
  popupImage.alt = imageElement.alt;
  popupCaption.textContent = imageElement.alt;
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});
