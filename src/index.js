import "./styles/index.css";
import { createCard, deleteCard, likeCard } from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import logoSrc from "./images/logo.svg";
import { enableValidation, clearValidation } from "./components/validation";
import { getUserInfo, getInitialCards } from "./api.js";
import { updateUserInfo } from "./api.js";
import { addCardToServer } from "./api.js";
import { deleteCardFromServer } from "./api.js";
import { updateAvatar } from './api.js';
import { likeCardOnServer, unlikeCardOnServer } from './api.js';

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
const profileImageEditButton = document.querySelector('.profile__image-edit-button');
const updateAvatarPopup = document.querySelector('.popup_type_update-avatar');
const avatarForm = document.querySelector('.popup__form[name="update-avatar"]');
const avatarLinkInput = document.querySelector('.popup__input[name="avatar-link"]');

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

document.addEventListener("DOMContentLoaded", () => {
  headerLogo.src = logoSrc;

  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, cards]) => {
      updateProfile(userInfo); 
      renderInitialCards(cards, userInfo._id); 
      currentUserId = userInfo._id; 
      console.log("ID текущего пользователя:", currentUserId);
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
    });
});

export function renderInitialCards(cards, userId) {
  cards.forEach((card) => {
    const cardElement = createCard(
      card,
      deleteCardCallback,
      likeCardCallback,
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
  const saveButton = evt.target.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  updateUserInfo(nameInput.value, jobInput.value)
    .then(() => {
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
      closePopup(editProfilePopup);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
    })
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  
  const submitButton = evt.target.querySelector('.popup__button');
  const initialButtonText = submitButton.textContent; 
  submitButton.textContent = 'Сохранение...'; 
  
  addCardToServer(placeNameInput.value, placeLinkInput.value)
    .then((newCardData) => {
      const newCard = createCard(
        newCardData,
        deleteCardCallback,
        likeCard,
        handleCardClick
      );
      placesList.prepend(newCard);
      closePopup(addCardPopup);
      addCardForm.reset();
    })
    .catch((error) => {
      console.error("Ошибка при добавлении карточки на сервер:", error);
    })
    .finally(() => {
      submitButton.textContent = initialButtonText; 
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
  profileName.textContent = userInfo.name;
  profileJob.textContent = userInfo.about;
  profileImageDiv.style.backgroundImage = `url('${userInfo.avatar}')`;
}


const deleteCardCallback = (cardElement, cardId) => {
  deleteCardFromServer(cardId)
    .then(() => {
      deleteCard(cardElement); 
      console.log("Карточка удалена: ", cardId);
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки: ", error);
      alert("Не удалось удалить карточку. Пожалуйста, попробуйте ещё раз.");
    });
};

profileImageDiv.addEventListener('click', () => {
  openPopup(updateAvatarPopup);
});

avatarForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const saveButton = avatarForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  updateAvatar(avatarLinkInput.value)
    .then((updatedUserInfo) => {
      profileImageDiv.style.backgroundImage = `url('${avatarLinkInput.value}')`;
      closePopup(updateAvatarPopup);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении аватара:", error);
    })
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    });
});
export function likeCardCallback(cardData, likeButton, likeCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const action = isLiked ? unlikeCardOnServer : likeCardOnServer;

  action(cardData._id)
    .then(updatedCardData => {
      likeCount.textContent = updatedCardData.likes.length; 
      likeButton.classList.toggle("card__like-button_is-active"); 
    })
    .catch(error => {
      console.error("Ошибка при обработке лайка:", error);
    });
}