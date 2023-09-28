/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

import Popup from "./Popup.js";

/* -------------------------------------------------------------------------- */
/*                                    Class                                   */
/* -------------------------------------------------------------------------- */

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".modal__preview-image");
    this._caption = this._popupElement.querySelector(".modal__image-title");
  }

  open({ link, name }) {
    this._popupElement.querySelector(".modal__image-title").textContent = name;
    const image = this._popupElement.querySelector(".modal__preview-image");
    image.src = link;
    image.alt = name;
    super.open();
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */
