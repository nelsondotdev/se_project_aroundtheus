const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageElement = document.querySelector(".modal__preview-image");
const previewTitleElement = document.querySelector(".modal__image-title");
const ESC_KEYCODE = 27;

const handleEscEvent = (e) => {
  e.preventDefault();

  const activePopup = document.querySelector(".modal_opened");

  if (e.which === ESC_KEYCODE) {
    closePopup(activePopup);
  }
};

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscEvent);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscEvent);
}

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getCardElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());
    this._element
      .querySelector(".card__trash-button")
      .addEventListener("click", () => this._handleDeleteCard());
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewImage());
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handlePreviewImage() {
    previewImageElement.src = this._link;
    previewImageElement.alt = this._name;
    previewTitleElement.textContent = this._name;
    openPopup(previewImageModal);
  }

  getView() {
    this._element = this._getCardElement();
    this._setEventListeners();

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}
