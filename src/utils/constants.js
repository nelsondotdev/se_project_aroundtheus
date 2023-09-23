/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- Cards --------------------------------- */

export const initialCards = [
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

/* ---------------------------- Generic Elements ---------------------------- */

export const popups = document.querySelectorAll(".modal");

/* ---------------------------- Profile Elements ---------------------------- */

export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const closeProfileEditModal =
  profileEditModal.querySelector(".modal__close");
export const profileHeading = document.querySelector(".profile__heading");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileHeadingInput = document.querySelector(
  "#profile-heading-input"
);
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/* ------------------------------ Card Elements ----------------------------- */

export const cardAddButton = document.querySelector("#card-add-button");
export const cardAddModal = document.querySelector("#card-add-modal");
export const closeCardAddModal = cardAddModal.querySelector(".modal__close");
export const cardListEl = document.querySelector(".cards__list");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const cardSelector = "#card-template";

/* ------------------------- Preview Image Elements ------------------------- */

export const previewImageModal = document.querySelector("#preview-image-modal");
export const previewImageElement = document.querySelector(
  ".modal__preview-image"
);
export const previewTitleElement = document.querySelector(
  ".modal__image-title"
);
export const closePreviewImageModal = document.querySelector(
  ".modal__close_type_preview"
);

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */
