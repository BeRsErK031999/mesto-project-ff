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

document.addEventListener("DOMContentLoaded", () => {
  headerLogo.src = logoSrc;
  if (profileImageDiv) {
    profileImageDiv.style.backgroundImage = `url('${avatarSrc}')`;
  }
  renderInitialCards(initialCards);
});

function renderInitialCards(cards) {
  const placesList = document.querySelector(".places__list");
  cards.forEach((card) => {
    const cardElement = createCard(card, deleteCard, likeCard);
    placesList.appendChild(cardElement);
  });
}

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editProfilePopup);
});

addCardButton.addEventListener("click", () => openPopup(addCardPopup));

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

formElement.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(
    { name: placeNameInput.value, link: placeLinkInput.value },
    deleteCard,
    likeCard
  );
  document.querySelector(".places__list").prepend(newCard);
  closePopup(addCardPopup);
  addCardForm.reset();
}

document.querySelector(".places__list").addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    openPopup(imagePopup);
    imagePopup.querySelector(".popup__image").src = event.target.src;
    imagePopup.querySelector(".popup__image").alt = event.target.alt;
    imagePopup.querySelector(".popup__caption").textContent = event.target.alt;
  }
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});
