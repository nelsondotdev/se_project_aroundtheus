/* --------------------------------- Imports -------------------------------- */

import Popup from "./Popup.js";

/* ---------------------------------- Class --------------------------------- */

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".modal__preview-image");
    this._imageText = this._popupElement.querySelector(".modal__image-title");
  }

  open(data) {
    this._imageText.textContent = data.name;
    this._image.alt = data.name;
    this._image.src = data.link;
    super.open();
  }
}

/* --------------------------------- Exports -------------------------------- */

export default PopupWithImage;
