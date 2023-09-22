/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   Classes                                  */
/* -------------------------------------------------------------------------- */

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscEvent);
  }

  closePopup() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscEvent);
  }

  _handleEscEvent(e) {
    if (
      e.key === "Escape" &&
      this._popupElement.classList.contains("modal_opened")
    ) {
      this.closePopup();
    }
  }

  _handleOutsideClick(e) {
    if (
      e.target.classList.contains("modal") ||
      e.target.classList.contains("modal__close")
    ) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", () => this.openPopup());
    document.addEventListener("keyup", (e) => this._handleEscEvent());
    document.addEventListener("click", (e) => this._handleOutsideClick());
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */
