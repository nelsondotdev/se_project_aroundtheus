/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

import FormValidator from "../components/formvalidator.js";
import Card from "../components/card.js";

/* -------------------------------------------------------------------------- */
/*                            Validation Activation                           */
/* -------------------------------------------------------------------------- */

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const editFormModalWindow = document.querySelector("#edit-profile-form");
const cardFormModalWindow = document.querySelector("#add-card-form");

/* -------------------------------------------------------------------------- */
/*                          Form Validator Instances                          */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(config, editFormModalWindow);
const cardFormValidator = new FormValidator(config, cardFormModalWindow);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                    Cards                                   */
/* -------------------------------------------------------------------------- */

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

/* ---------------------------- Profile Elements ---------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const closeProfileEditModal = profileEditModal.querySelector(".modal__close");
const profileHeading = document.querySelector(".profile__heading");
const profileDescription = document.querySelector(".profile__description");
const profileHeadingInput = document.querySelector("#profile-heading-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.forms["edit-profile-form"];

/* ------------------------------ Card Elements ----------------------------- */

const cardAddButton = document.querySelector("#card-add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const closeCardAddModal = cardAddModal.querySelector(".modal__close");
const cardAddForm = document.forms["add-card-form"];
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardSelector = "#card-template";

/* ------------------------- Preview Image Elements ------------------------- */

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageElement = document.querySelector(".modal__preview-image");
const previewTitleElement = document.querySelector(".modal__image-title");
const closePreviewImageModal = document.querySelector(
  ".modal__close_type_preview"
);

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function fillProfileForm() {
  profileHeadingInput.value = profileHeading.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openProfileEditModal() {
  fillProfileForm();
  openPopup(profileEditModal);
}

function openPopup(data) {
  data.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscEvent);
}

function closePopup(data) {
  data.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscEvent);
}

function renderCard(data) {
  const card = new Card(data, "#card-template");
  cardListEl.prepend(card.getView());
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileHeading.textContent = profileHeadingInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardView = renderCard({ name, link });
  e.target.reset();
  closePopup(cardAddModal);
  cardFormValidator.toggleButtonState();
}

function handleOutsideClick(e) {
  if (
    e.target.classList.contains("modal") ||
    e.target.classList.contains("modal__close")
  ) {
    closePopup(e.currentTarget);
  }
}

function handleEscEvent(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", openProfileEditModal);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardAddButton.addEventListener("click", () => openPopup(cardAddModal));

cardAddForm.addEventListener("submit", handleCardAddSubmit);

profileEditModal.addEventListener("click", handleOutsideClick);

cardAddModal.addEventListener("click", handleOutsideClick);

previewImageModal.addEventListener("click", handleOutsideClick);

/* -------------------------------------------------------------------------- */
/*                                    Loops                                   */
/* -------------------------------------------------------------------------- */

initialCards.forEach((data) => {
  renderCard(data, cardListEl);
});

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export { openPopup, closePopup };