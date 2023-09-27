/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------- Components ------------------------------- */

import FormValidator from "../components/formvalidator.js";
import Card from "../components/card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

/* ------------------------- Utilities and constants ------------------------ */

import {
  initialCards,
  selectors,
  profileEditModal,
  profileHeadingInput,
  profileHeading,
  profileDescription,
  profileDescriptionInput,
  cardListEl,
  cardAddModal,
  profileEditButton,
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

/* ---------------------------- Section Instances --------------------------- */

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = new Card(
        data,
        selectors.cardTemplate,
        handleImageClick
      );
      return cardElement.getView();
    },
  },
  `.${selectors.cardSection}`
);

/* --------------------------- User Info Instances -------------------------- */

const userInfo = new UserInfo({
  nameSelector: ".profile__heading",
  jobSelector: ".profile__description",
});

/* ----------------------------- Popup Instances ---------------------------- */

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#card-add-modal", handleCardAddSubmit);
addCardPopup.setEventListeners();

function handleImageClick(data) {
  const imagePopup = new PopupWithImage("#preview-image-modal");
  imagePopup.open(data.link, data.name);
}

/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */

cardSection.renderItems(initialCards);

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
  const name = profileHeadingInput.value;
  const job = profileDescriptionInput.value;
  UserInfo.setUserInfo({ name, job });
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

// function handleImageClick(data) {
//   imagePopup.openPopup(data.link, data.name);
// }

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

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export { openPopup, closePopup };
