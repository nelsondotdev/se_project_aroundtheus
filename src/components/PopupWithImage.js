/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

import Popup from "./Popup.js";

/* -------------------------------------------------------------------------- */
/*                                   Classes                                  */
/* -------------------------------------------------------------------------- */

class PopupWithImage extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {}

  setEventListeners() {
    super.setEventListeners();
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */
