import "./styles/index.css";
import { createCard, deleteCard, likeCard } from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import logoSrc from "./images/logo.svg";
import { enableValidation, clearValidation } from "./components/validation";
import { getUserInfo, getInitialCards } from "./api.js";
import { updateUserInfo } from "./api.js";
import { addCardToServer } from "./api.js";
import { deleteCardFromServer } from "./api.js";

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
let currentUserId = null;
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

document.addEventListener("DOMContentLoaded", async () => {
  headerLogo.src = logoSrc;

  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
  // Получить данные с сервера и отобразить их
  try {
    const userInfo = await getUserInfo();
    const cards = await getInitialCards();
    updateProfile(userInfo);
    // Поскольку currentUserId теперь установлен, мы можем безопасно его использовать
    renderInitialCards(cards, userInfo._id); // Модифицируйте renderInitialCards, чтобы он принимал userId
    currentUserId = userInfo._id; // Сохраняем ID текущего пользователя
    console.log("ID текущего пользователя:", currentUserId); // Выводим в консоль для проверки
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
});

export function renderInitialCards(cards, userId) {
  cards.forEach((card) => {
    const cardElement = createCard(
      card,
      deleteCardCallback,
      likeCard,
      handleCardClick,
      userId
    );
    placesList.appendChild(cardElement);
  });
}

editProfileButton.addEventListener("click", () => {
  clearValidation(editProfilePopup, validationConfig);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editProfilePopup);
});

addCardButton.addEventListener("click", () => {
  clearValidation(addCardPopup, validationConfig);
  openPopup(addCardPopup);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

formElement.addEventListener("submit", handleFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editProfilePopup);
  updateUserInfo(nameInput.value, jobInput.value);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  addCardToServer(placeNameInput.value, placeLinkInput.value)
    .then((newCardData) => {
      const newCard = createCard(
        newCardData, // Используйте данные, возвращенные сервером
        deleteCard,
        likeCard,
        handleCardClick
      );
      placesList.prepend(newCard);
      closePopup(addCardPopup);
      addCardForm.reset();
    })
    .catch((error) => {
      console.error("Ошибка при добавлении карточки на сервер:", error);
    });
}

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

function updateProfile(userInfo) {
  // Обновляем имя пользователя, описание и изображение аватара
  profileName.textContent = userInfo.name;
  profileJob.textContent = userInfo.about;
  profileImageDiv.style.backgroundImage = `url('${userInfo.avatar}')`;
}

async function handleDeleteCard(cardElement, cardId) {
  try {
    await deleteCardFromServer(cardId);
    deleteCard(cardElement); // Удаляем карточку из DOM после успешного запроса
  } catch (error) {
    console.error("Ошибка при удалении карточки:", error);
    alert("Не удалось удалить карточку. Пожалуйста, попробуйте ещё раз."); // Обратная связь пользователю
  }
}

const deleteCardCallback = (cardElement, cardId) => {
  deleteCardFromServer(cardId)
    .then(() => {
      deleteCard(cardElement); // Удаляем карточку из DOM
      console.log("Карточка удалена: ", cardId);
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки: ", error);
      alert("Не удалось удалить карточку. Пожалуйста, попробуйте ещё раз.");
    });
};
