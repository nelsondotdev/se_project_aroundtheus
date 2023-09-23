/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------- Components ------------------------------- */

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
  formValidators,
  profileEditButton,
  profileEditForm,
  cardAddButton,
  popups,
} from "../utils/constants.js";

/* --------------------------------- Styles --------------------------------- */

import "./index.css";

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

popups.forEach((popupElement) => {
  new Popup(popupElement);
});

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export { openPopup, closePopup };
