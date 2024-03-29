/* --------------------------------- Imports -------------------------------- */

/* ---------------------------------- Class --------------------------------- */

class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getCardElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteCard = this._element.querySelector(".card__trash-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    this._deleteCard.addEventListener("click", () => {
      this._handleDeleteCard();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  getView() {
    this._element = this._getCardElement();
    this._setEventListeners();
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    return this._element;
  }
}

/* --------------------------------- Exports -------------------------------- */

export default Card;
