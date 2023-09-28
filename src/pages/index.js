/* --------------------------------- Imports -------------------------------- */

// Components

import FormValidator from "../components/formvalidator.js";
import Card from "../components/card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

// Utilities and constants

import { selectors, config, cardTemplate } from "../utils/utils.js";

import {
  initialCards,
  profileHeadingInput,
  profileHeading,
  profileDescription,
  profileDescriptionInput,
  cardAddForm,
  profileEditButton,
  cardAddButton,
} from "../utils/constants.js";

// Styles

import "./index.css";

/* -------------------------------- Instances ------------------------------- */

// Form Validator Initialization

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

// Section Initialization

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = new Card(
        data,
        selectors.cardTemplate,
        handleImageClick
      );
      const cardView = cardElement.getView();
      cardSection.addItem(cardView);
      return cardView;
    },
  },
  `.${selectors.cardSection}`
);

// User Info Initialization

const userInfo = new UserInfo({
  nameSelector: ".profile__heading",
  aboutSelector: ".profile__description",
});

// Edit Profile Popup Initialization

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleEditProfileSubmit
);

// Add Card Popup Initialization

const addCardPopup = new PopupWithForm("#card-add-modal", handleCardAddSubmit);

// Image Popup Initialization

const imagePopup = new PopupWithImage("#preview-image-modal");

/* ------------------------------ Method Calls ------------------------------ */

// Section Invocation

cardSection.renderItems(initialCards);

// User Info Invocation

userInfo.setUserInfo({
  name: profileHeading.textContent,
  about: profileDescription.textContent,
});

// Edit Profile Popup Invocation

editProfilePopup.setEventListeners();

// Add Card Popup Invocation

addCardPopup.setEventListeners();

// Image Popup Invocation

imagePopup.setEventListeners();

/* -------------------------------- Functions ------------------------------- */

// Edit Profile Functions

function fillProfileForm() {
  profileHeadingInput.value = profileHeading.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

/* ----------------------------- Event Handlers ----------------------------- */

// Add Card Handlers

function handleCardAddSubmit(data) {
  cardSection.addItem(data);
  addCardPopup.close();
  formValidators[cardAddForm.getAttribute("name")].resetValidation();
}

// Edit Profile Handlers

function handleEditProfileSubmit(data) {
  userInfo.setUserInfo(data);
  editProfilePopup.close();
}

// Image Click Handlers

function handleImageClick(data) {
  imagePopup.open(data);
}

/* ----------------------------- Event Listeners ---------------------------- */

// Edit Profile Listeners

profileEditButton.addEventListener("click", () => {
  editProfilePopup.open();
  fillProfileForm();
});

// Add Card Listeners

cardAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

/* --------------------------------- Exports -------------------------------- */
