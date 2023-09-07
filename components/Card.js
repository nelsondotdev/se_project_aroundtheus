const imageModalWindow = document.querySelector(
  ".modal__container_type_preview"
);
const imageElement = imageModalWindow.querySelector(".modal__preview-image");
const imageCaption = imageModalWindow.querySelector(".modal__image-title");
const ESC_KEYCODE = 27;

const handleEsc = (e) => {
  e.preventDefault();

  const activePopup = document.querySelector(".modal_opened");

  if (e.which === ESC_KEYCODE) {
    closeModalWindow(activePopup);
  }
};

const openModalWindow = (modalWindow) => {
  modalWindow.classList.add("modal_opened");
  document.addEventListener("keyup", handleEsc);
};

const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEsc);
};

class Card {
  constructor(data, cardSelector) {
    this._text = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {}

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handlePreviewPicture() {}

  renderCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__title").textContent = this._text;

    return this._element;
  }
}

export default Card;
