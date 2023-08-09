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
const profileEditForm = profileEditModal.querySelector("#edit-profile-form");

/* ------------------------------ Card Elements ----------------------------- */

const cardAddButton = document.querySelector("#card-add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const closeCardAddModal = cardAddModal.querySelector(".modal__close");
const cardAddForm = document.querySelector("#add-card-form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

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

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscEvent);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscEvent);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });
  const cardTrashButton = cardElement.querySelector(".card__trash-button");
  cardTrashButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", () => {
    previewImageElement.src = cardData.link;
    previewImageElement.alt = cardData.name;
    previewTitleElement.textContent = cardData.name;
    openPopup(previewImageModal);
  });
  return cardElement;
}

function renderCard(cardElement, container) {
  container.prepend(cardElement);
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
  const cardView = getCardElement({
    name,
    link,
  });
  e.target.reset();
  renderCard(cardView, cardListEl);
  closePopup(cardAddModal);
}

function handleOutsideClick(e) {
  if (
    e.target.classList.contains("modal") ||
    e.target.classList.contains("modal__close")
  ) {
    closePopup(profileEditModal);
    closePopup(cardAddModal);
    closePopup(previewImageModal);
  }
}

function handleEscEvent(e) {
  if (e.key === "Escape") {
    closePopup(profileEditModal);
    closePopup(cardAddModal);
    closePopup(previewImageModal);
  }
}

// function handleEscEvent(e, action) {
//   const activeModal = document.querySelector(".modal__opened");
//   if (e.key === "Escape") {
//     action(activeModal);
//   }
// }

// function handleEscUp(e) {
//   e.preventDefault();
//   handleEscEvent(e, closeProfileEditModal);
// }

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", openProfileEditModal);

closeProfileEditModal.addEventListener("click", () =>
  closePopup(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardAddButton.addEventListener("click", () => openPopup(cardAddModal));

closeCardAddModal.addEventListener("click", () => closePopup(cardAddModal));

cardAddForm.addEventListener("submit", handleCardAddSubmit);

closePreviewImageModal.addEventListener("click", () =>
  closePopup(previewImageModal)
);

profileEditModal.addEventListener("click", handleOutsideClick);

cardAddModal.addEventListener("click", handleOutsideClick);

previewImageModal.addEventListener("click", handleOutsideClick);

profileEditModal.addEventListener("keyup", handleEscEvent);

/* -------------------------------------------------------------------------- */
/*                                    Loops                                   */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => {
  const cardView = getCardElement(cardData);
  renderCard(cardView, cardListEl);
});
