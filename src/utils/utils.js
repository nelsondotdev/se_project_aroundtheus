/* --------------------------------- Imports -------------------------------- */

/* -------------------------------- Elements -------------------------------- */

// DOM Elements

const selectors = {
  cardSection: "cards__list",
  cardTemplate: "#card-template",
  previewModal: "#preview-image-modal",
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* --------------------------------- Exports -------------------------------- */

export {
  // DOM Elements
  selectors,
  config,
  cardTemplate,
};
