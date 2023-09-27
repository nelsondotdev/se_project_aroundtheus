/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

import Popup from "./Popup.js";
import { openPopup, closePopup } from "../pages/index.js";

/* -------------------------------------------------------------------------- */
/*                                   Classes                                  */
/* -------------------------------------------------------------------------- */

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".modal__preview-image");
    this._caption = this._popupElement.querySelector(".modal__image-title");
  }

  open(image, caption) {
    this._image.src = image;
    this._image.alt = caption;
    this._caption.textContent = caption;
    super.open();
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */
