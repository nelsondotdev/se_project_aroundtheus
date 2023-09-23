/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------- Components ------------------------------- */

import FormValidator from "../components/formvalidator.js";
import Card from "../components/card.js";
import Popup from "../components/Popup.js";

/* ------------------------- Utilities and constants ------------------------ */

import {
  initialCards,
  profileEditModal,
  profileHeadingInput,
  profileHeading,
  profileDescription,
  profileDescriptionInput,
  cardListEl,
  cardAddModal,
  cardAddForm,
  profileEditButton,
  profileEditForm,
  cardAddButton,
  popups,
} from "../utils/constants.js";

/* --------------------------------- Styles --------------------------------- */

import "./index.css";

/* -------------------------------------------------------------------------- */
/*                               Instantiations                               */
/* -------------------------------------------------------------------------- */

/* ------------------------ Form Validator Activation ----------------------- */

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

export const profileEditForm = document.forms["edit-profile-form"];
export const cardAddForm = document.forms["add-card-form"];

/* ------------------------ Form Validator Instances ------------------------ */

export const formValidators = {};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formEl) => {
    const validator = new FormValidator(config, formEl);
    const formName = formEl.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

/* ----------------------------- Popup Instances ---------------------------- */

const popupEditProfile = new PopupWithForm();
const popupAddCard = new PopupWithForm();

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

function createCard(data) {
  const card = new Card(data, "#card-template");
  return card.getView();
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardListEl.prepend(cardElement);
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
  renderCard({ name, link });
  e.target.reset();
  closePopup(cardAddModal);
  formValidators[cardAddForm.getAttribute("name")].resetValidation();
}

function handleOutsideClick(e, popup) {
  if (e.target.classList.contains("modal")) {
    closePopup(popup);
  }
  if (e.target.classList.contains("modal__close")) {
    closePopup(popup);
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

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => handleOutsideClick(e, popup));
});

/* -------------------------------------------------------------------------- */
/*                                    Loops                                   */
/* -------------------------------------------------------------------------- */

initialCards.forEach((data) => {
  renderCard(data, cardListEl);
});

// This combines overlay and close buttons to close popup
popups.forEach((popupElement) => {
  new Popup(popupElement);
});

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export { openPopup, closePopup };
