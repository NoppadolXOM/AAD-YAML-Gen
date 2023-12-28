(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeAccordion = void 0;
/**
 * Accordion Activation
 * 1) Add closed class to all accordion items by default
 * 2) Add and remove active class to tabs depending on which one you click on
 * 3) Add the id to the URL
 */
const initializeAccordion = () => {
  var accordionItem = document.querySelectorAll(".em-js-accordion-item");
  var accordionBtn = document.querySelectorAll(".em-js-accordion-trigger");
  for (let i = 0; i < accordionItem.length; i++) {
    accordionItem[i].classList.add("em-is-closed"); /* 1 */
  }
  for (let i = 0; i < accordionBtn.length; i++) {
    accordionBtn[i].addEventListener("click", function (e) {
      e.preventDefault();
      var parent = this.parentNode.parentNode;
      toggleAccordion(parent);
      if (parent.classList.contains("em-is-closed")) {
        this.setAttribute("aria-expanded", false);
      } else {
        this.setAttribute("aria-expanded", true);
      }
    });
  }
  function toggleAccordion(el) {
    el.classList.toggle("em-is-closed");
  }
};
exports.initializeAccordion = initializeAccordion;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeButton = void 0;
/**
 * Add Button Bar Button Active State
 * 1) When clicking on a button within button bar, the class of em-is-active is added and removed
 *    Each button toggles itself so multiple buttons can be active.
 */

const initializeButton = () => {
  var button = document.querySelectorAll(".em-js-btn-selectable");
  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function (e) {
      this.classList.toggle("em-is-active");
    });
  }
};
exports.initializeButton = initializeButton;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeClickOutside = void 0;
/**
 * Click Outside Elements
 * 1) Certain elements need closed when any area not in the element itself is clicked
 * 2) See: http://stackoverflow.com/questions/152975/how-to-detect-a-click-outside-an-element
 * 3) .em-js-nav-dropdown, .em-js-nav-dropdown-trigger, .em-js-dropdown-check, .em-js-dropdown-trigger:not(.em-js-show-hide-trigger), .em-js-dropdown
 */
const initializeClickOutside = () => {
  // first grab the list of elements that you need to watch - just the elements, we will take care of child elements in the code below
  var elementsToBeClosed = Array.prototype.slice.call(document.querySelectorAll(".em-js-nav-dropdown, .em-js-nav-dropdown-trigger, .em-js-dropdown-check, .em-js-dropdown-trigger:not(.em-js-show-hide-trigger), .em-js-dropdown, .em-js-dropdown-radio, .em-js-dropdown-radio-trigger"));
  // when someone clicks the body, we run this:
  function handleBodyClick(e) {
    // we loop over every element and check...
    var stayOpen = elementsToBeClosed.some(function (el) {
      // ..if it is the actual element
      if (el === e.target) {
        return true;
      }
      // if it's a nested child element of one of the watched
      if (el.contains(e.target)) {
        return true;
      }
      // otherwise we should close them
      return false;
    });
    if (!stayOpen) {
      // var open = document.querySelectorAll('.em-is-active');
      elementsToBeClosed.forEach(function (el) {
        el.classList.remove("em-is-active");
      });
      var header = document.querySelector(".em-c-header");
      if (header) {
        header.classList.remove("em-is-active");
      }
    }
  }
  document.body.addEventListener("click", handleBodyClick);
};
exports.initializeClickOutside = initializeClickOutside;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeCollapsibleTable = void 0;
/**
 * Collapsible Table Rows
 * 1) On click of a table row trigger, open the hidden table rows below it.
 * 2) While the parent has a next sibling and the parent doesn't have em-js-table-row-parent, add visible and open classes
 */

const initializeCollapsibleTable = () => {
  var collapseTrigger = document.querySelectorAll(".em-js-collapse-trigger");
  for (let i = 0; i < collapseTrigger.length; i++) {
    collapseTrigger[i].addEventListener("click", function (e) {
      e.preventDefault();
      var thisParent = this.parentNode;
      var next = [];
      while (thisParent.nextElementSibling && !thisParent.nextElementSibling.classList.contains("em-js-table-row-parent")) {
        next.push(thisParent = thisParent.nextElementSibling);
        if (thisParent.classList.contains("em-is-visible")) {
          this.parentNode.classList.remove("em-is-open"); /* 2 */
          thisParent.classList.remove("em-is-visible"); /* 2 */
        } else {
          this.parentNode.classList.add("em-is-open"); /* 2 */
          thisParent.classList.add("em-is-visible"); /* 2 */
        }
      }
    });
  }
};
exports.initializeCollapsibleTable = initializeCollapsibleTable;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeCollapsibleToolbar = void 0;
/**
 * Collapsible toolbar
 * Adds active class to toolbar trigger and collapsible toolbar parent when clicked on.
 * Removes active class from toolbar trigger and collapsible toolbar parent when clicked on again.
 */

const initializeCollapsibleToolbar = () => {
  var toolbarTrigger = document.querySelectorAll(".em-js-toolbar-trigger");
  var toolbarPanel = document.querySelectorAll(".em-js-collapsible-toolbar");
  for (let i = 0; i < toolbarTrigger.length; i++) {
    toolbarTrigger[i].addEventListener("click", function (e) {
      e.preventDefault();
      if (this.parentElement.classList.contains("em-is-active")) {
        this.classList.remove("em-is-active");
        this.parentElement.classList.remove("em-is-active");
        this.parentElement.setAttribute("aria-expanded", false);
      } else {
        for (let j = 0; j < toolbarPanel.length; j++) {
          toolbarPanel[j].classList.remove("em-is-active");
          toolbarTrigger[j].classList.remove("em-is-active");
          this.classList.remove("em-is-active");
          this.parentElement.setAttribute("aria-expanded", true);
        }
        this.classList.add("em-is-active");
        this.parentElement.classList.add("em-is-active");
      }
    });
  }
};
exports.initializeCollapsibleToolbar = initializeCollapsibleToolbar;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeDateRangePicker = void 0;
const initializeDateRangePicker = () => {
  const dataChange = () => {
    let myElement = document.querySelectorAll(".inclusive-dates-calendar__date--in-range");
    let myElementAll = document.querySelectorAll(".em-date-picker-range");
    myElementAll.forEach(element => {
      element.classList.remove("em-date-picker-range");
    });
    if (myElement.length > 0) {
      let end = myElement[myElement.length - 1];
      end.classList.add("em-date-picker-range");
    }
  };
  const observeIfElementExists = () => {
    const calendar = document.querySelector(".inclusive-dates-calendar__calendar");
    if (calendar) {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.target.classList.contains("inclusive-dates-calendar__date--in-range")) {
            dataChange();
          }
        });
      });
      observer.observe(calendar, {
        attributes: true,
        attributeFilter: ["class"]
      });
    } else {
      setTimeout(observeIfElementExists, 500);
    }
  };
  observeIfElementExists();
};
exports.initializeDateRangePicker = initializeDateRangePicker;
window.addEventListener("load", initializeDateRangePicker);

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeDropdownCheck = void 0;
/**
 * Dropdown check
 * Adds active class to dropdown trigger and dropdown check parent when clicked on.
 * Removes active class from dropdown trigger and dropdown check parent when clicked on again.
 */
const initializeDropdownCheck = () => {
  var dropdownTrigger = document.querySelectorAll(".em-js-dropdown-trigger");
  var dropdownPanel = document.querySelectorAll(".em-js-dropdown-check");
  for (let i = 0; i < dropdownTrigger.length; i++) {
    dropdownTrigger[i].addEventListener("click", function (e) {
      e.preventDefault();
      if (dropdownTrigger[i].parentElement.classList.contains("em-is-active")) {
        dropdownTrigger[i].classList.remove("em-is-active");
        dropdownTrigger[i].parentElement.classList.remove("em-is-active");
        this.setAttribute("aria-expanded", false);
      } else {
        for (let j = 0; j < dropdownPanel.length; j++) {
          dropdownPanel[j].classList.remove("em-is-active");
          dropdownTrigger[j].classList.remove("em-is-active");
          dropdownTrigger[i].classList.remove("em-is-active");
        }
        dropdownTrigger[i].classList.add("em-is-active");
        dropdownTrigger[i].parentElement.classList.add("em-is-active");
        this.setAttribute("aria-expanded", true);
      }
    });
  }
};
exports.initializeDropdownCheck = initializeDropdownCheck;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeFileUpload = void 0;
/**
 * File Upload
 * 1) Run this function every time you browse the file upload
 * 2) Remove previous file upload list items for every file upload
 * 3) Replace empty list with new files if there are files
 * 4) Get rid of upload files if cancel button is hit and replace with message to upload files
 */

const initializeFileUpload = () => {
  var fileUpload = document.querySelectorAll(".em-c-field--file-upload");
  for (let i = 0; i < fileUpload.length; i++) {
    fileUpload[i].addEventListener("dragover", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
    fileUpload[i].addEventListener("dragleave", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
    fileUpload[i].addEventListener("drop", function (e) {
      updateFileBoxInfo(this, e.dataTransfer.files);
      e.stopPropagation();
    });
    fileUpload[i].addEventListener("change", function (e) {
      var thisInput = this.querySelector(".em-c-file-upload");
      updateFileBoxInfo(this, thisInput.files);
      e.stopPropagation();
    });
  }
  function updateFileBoxInfo(el, files) {
    var list = el.querySelector(".em-js-field-list");
    var listItems = el.querySelectorAll(".em-js-field-item");
    var listItem;
    if (files.length > 0) {
      for (let j = 0; j < listItems.length; j++) {
        list.removeChild(listItems[j]); /* 2 */
      }
      for (let k = 0; k < files.length; k++) {
        listItem = document.createElement("li");
        listItem.classList.add("em-js-field-item"); /* 3 */
        listItem.innerText = "File " + (k + 1) + ":  " + files[k].name; /* 3 */
        list.appendChild(listItem); /* 3 */
      }
    } else {
      list.innerHTML = "";
      listItem = document.createElement("li");
      listItem.classList.add("em-js-field-item"); /* 3 */
      listItem.innerText = "Choose files to upload"; /* 3 */
      list.appendChild(listItem); /* 3 */
    }
  }
};
exports.initializeFileUpload = initializeFileUpload;

},{}],9:[function(require,module,exports){
"use strict";

var _accordion = require("./accordion");
var _button = require("./button");
var _clickOutside = require("./click-outside");
var _collapsibleTable = require("./collapsible-table");
var _collapsibleToolbar = require("./collapsible-toolbar");
var _dateRangePicker = require("./date-range-picker");
var _dropdownCheck = require("./dropdown-check");
var _fileUpload = require("./file-upload");
var _input = require("./input");
var _masonry = require("./masonry");
var _modal = require("./modal");
var _primaryNav = require("./primary-nav");
var _rangeSlider = require("./range-slider");
var _sectionExpandable = require("./section-expandable");
var _showHide = require("./show-hide");
var _table = require("./table");
var _tabs = require("./tabs");
var _tags = require("./tags");
var _tree = require("./tree");
(0, _accordion.initializeAccordion)();
(0, _button.initializeButton)();
(0, _clickOutside.initializeClickOutside)();
(0, _collapsibleTable.initializeCollapsibleTable)();
(0, _collapsibleToolbar.initializeCollapsibleToolbar)();
(0, _dateRangePicker.initializeDateRangePicker)();
(0, _dropdownCheck.initializeDropdownCheck)();
(0, _fileUpload.initializeFileUpload)();
(0, _input.initializeInput)();
(0, _masonry.initializeMasonry)();
(0, _modal.initializeModal)();
(0, _primaryNav.initializePrimaryNav)();
(0, _rangeSlider.initializeRangeSlider)();
(0, _sectionExpandable.initializeSectionExpandable)();
(0, _showHide.initializeShowHide)();
(0, _table.initializeTable)();
(0, _tabs.initializeTabs)();
(0, _tags.initializeTags)();
(0, _tree.initializeTree)();

},{"./accordion":1,"./button":2,"./click-outside":3,"./collapsible-table":4,"./collapsible-toolbar":5,"./date-range-picker":6,"./dropdown-check":7,"./file-upload":8,"./input":10,"./masonry":11,"./modal":12,"./primary-nav":13,"./range-slider":14,"./section-expandable":15,"./show-hide":16,"./table":17,"./tabs":18,"./tags":19,"./tree":20}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeInput = void 0;
/**
 * Input Utility script
 *
 * 1) Polyfill
 * 2) This script adds .em-is-active on the focus event of an input
 */

/*1*/
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

/*2*/
const initializeInput = () => {
  var inputs = document.querySelectorAll(".em-js-input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("focus", function (e) {
      e.preventDefault();
      e.currentTarget.closest(".em-c-field").classList.add("em-is-active");
    });
    inputs[i].addEventListener("blur", function (e) {
      e.preventDefault();
      e.currentTarget.closest(".em-c-field").classList.remove("em-is-active");
    });
  }
};
exports.initializeInput = initializeInput;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeMasonry = void 0;
const initializeMasonry = () => {
  let grid = document.querySelector(".em-l-masonry-grid");
  if (grid) {
    const msnry = new Masonry(grid, {
      itemSelector: ".em-l-grid__item"
    });
    function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
    const divs = document.querySelectorAll(".em-c-card__action-icon");
    divs.forEach(el => el.addEventListener("click", event => {
      let itemElem = event.target.closest(".em-l-grid__item");
      itemElem.classList.toggle("em-is-expanded");
      delay(300).then(() => msnry.layout());
    }));
  }
};
exports.initializeMasonry = initializeMasonry;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeModal = void 0;
/**
 * Modal
 * 1) Adds closing class to the modal when the close button and overlay is clicked
 * 2) Closes the modal when the Esc key is pressed
 * 3) Removes closing class from the modal if opening trigger is present
 */

const initializeModal = () => {
  const modal = document.querySelectorAll(".em-c-modal__window");
  const overlay = document.querySelectorAll(".em-c-modal__overlay");
  const openTrigger = document.querySelectorAll(".em-js-modal-trigger");
  const closeBtn = document.querySelectorAll(".em-c-modal__close-btn");
  const closeModal = index => {
    modal[index].classList.add("em-is-closed");
    overlay[index].classList.add("em-is-closed");
  };

  /* 1 */
  if (closeBtn) {
    for (let i = 0; i < closeBtn.length; i++) {
      closeBtn[i].addEventListener("click", () => {
        closeModal(i);
      });
    }
  }

  /* 1 */
  if (overlay) {
    for (let i = 0; i < overlay.length; i++) {
      overlay[i].addEventListener("click", () => {
        closeModal(i);
      });
    }
  }

  /* 2 */
  document.addEventListener("keydown", e => {
    for (let i = 0; i < modal.length; i++) {
      if (e.key === "Escape" && !modal[i].classList.contains("em-is-closed")) {
        closeModal(i);
      }
    }
  });
  const openModal = index => {
    modal[index].classList.remove("em-is-closed");
    overlay[index].classList.remove("em-is-closed");
  };

  /* 3 */
  if (openTrigger) {
    for (let i = 0; i < openTrigger.length; i++) {
      openTrigger[i].addEventListener("click", () => {
        openModal(i);
      });
    }
  }

  // Trap focus inside modal
  // add all the elements inside modal which you want to make focusable
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const modalTrap = document.getElementsByClassName("em-c-modal")[0]; // select the modal

  if (modalTrap) {
    const firstFocusableElement = modalTrap.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
    const focusableContent = modalTrap.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

    document.addEventListener("keydown", e => {
      let isTabPressed = e.key === "Tab" || e.keyCode === 9;
      if (!isTabPressed) {
        return;
      }
      if (e.shiftKey) {
        // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus(); // add focus for the last focusable element
          e.preventDefault();
        }
      } else {
        // if tab key is pressed
        if (document.activeElement === lastFocusableElement) {
          // if focused has reached to last focusable element then focus first focusable element after pressing tab
          firstFocusableElement.focus(); // add focus for the first focusable element
          e.preventDefault();
        }
      }
    });
    firstFocusableElement.focus();
  }
};
exports.initializeModal = initializeModal;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializePrimaryNav = void 0;
/**
 * Primary Navigation Toggle
 * 1) Add and remove active class (em-is-active) of .em-js-nav-panel with click of the .em-js-nav-trigger
 */
const initializePrimaryNav = () => {
  var headerOverlay = document.createElement("div");
  headerOverlay.classList.add("em-c-header-overlay");
  var headerNode = document.querySelector(".em-c-header");
  var headerVerticalNode = document.querySelector(".em-c-header--vertical");
  if (headerNode && !headerVerticalNode) {
    headerNode.parentNode.insertBefore(headerOverlay, headerNode.nextSibling);
  }
  var menuButton = document.querySelectorAll(".em-js-nav-trigger");
  for (let i = 0; i < menuButton.length; i++) {
    menuButton[i].addEventListener("click", function () {
      var buttonLabel = this.querySelector(".em-js-btn-label");
      var buttonText = buttonLabel.innerHTML;
      var buttonSwap = this.querySelector(".em-js-btn-swap-icon");
      var iconPath = this.querySelector(".em-js-btn-icon");
      var bodyClass = document.querySelector("body");
      var header = document.querySelector(".em-c-header");
      var navPanel = header.querySelector(".em-js-nav-panel");
      if (buttonText === "Close") {
        buttonLabel.innerHTML = "Menu";
        iconPath.setAttribute("class", "em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-icon");
        buttonSwap.setAttribute("class", "em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-swap-icon em-u-is-hidden");
        this.classList.remove("em-is-active");
        bodyClass.classList.remove("em-is-disabled-small");
        header.classList.remove("em-is-active");
        navPanel.classList.remove("em-is-active");
      } else {
        buttonLabel.innerHTML = "Close";
        iconPath.setAttribute("class", "em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-icon em-u-is-hidden");
        buttonSwap.setAttribute("class", "em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-swap-icon");
        this.classList.add("em-is-active");
        bodyClass.classList.add("em-is-disabled-small");
        header.classList.add("em-is-active");
        navPanel.classList.add("em-is-active");
      }
    });
  }

  /**
   * Hide menu and disable overlay when user clicks outside the menu
   */

  if (headerOverlay) {
    headerOverlay.addEventListener("click", function (e) {
      var activeMenu = document.querySelector(".em-js-nav-dropdown-trigger.em-is-active");
      if (!activeMenu) return;
      toggle(activeMenu);
    });
  }

  /**
   * Search Icon Button Trigger
   * 1) Toggles the header search form
   */

  var searchTrigger = document.querySelectorAll(".em-js-header-search-trigger");
  for (let j = 0; j < searchTrigger.length; j++) {
    searchTrigger[j].addEventListener("click", function (e) {
      e.preventDefault();
      var buttonSwap = this.querySelector(".em-js-btn-swap-icon");
      var iconPath = this.querySelector(".em-js-btn-icon");
      var navPanel = e.target.closest(".em-c-header");
      var searchPanel = navPanel.querySelector(".em-js-header-search");
      if (this.classList.contains("em-is-active")) {
        this.classList.remove("em-is-active");
        iconPath.setAttribute("class", "em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-icon");
        buttonSwap.setAttribute("class", "em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-swap-icon em-u-is-hidden");
        searchPanel.classList.remove("em-is-active");
      } else {
        this.classList.add("em-is-active");
        iconPath.setAttribute("class", "em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-icon em-u-is-hidden");
        buttonSwap.setAttribute("class", "em-c-btn__icon em-c-btn__icon-only em-c-icon--small em-js-btn-swap-icon");
        searchPanel.classList.add("em-is-active");
      }
      var navDropdown = document.querySelectorAll(".em-js-nav-dropdown");
      var navDropdownTrigger = document.querySelectorAll(".em-js-nav-dropdown-trigger");
      for (let k = 0; k < navDropdown.length; k++) {
        navDropdown[k].classList.remove("em-is-active");
      }
      for (let k = 0; k < navDropdownTrigger.length; k++) {
        navDropdownTrigger[k].classList.remove("em-is-active");
      }
    });
  }

  /**
   * First Level Primary Navigation Dropdown Toggle
   * 1) Add and remove active class (em-is-active) of .em-js-dropdown and .em-js-dropdown-trigger with click of the .em-js-dropdown-trigger
   */
  var dropdownTrigger = document.querySelectorAll(".em-js-nav-dropdown-trigger");
  for (let l = 0; l < dropdownTrigger.length; l++) {
    dropdownTrigger[l].addEventListener("click", function (e) {
      e.preventDefault();
      toggle(this);
    });
  }
  function toggle(element) {
    var dropdownPanel = element.nextElementSibling;
    if (element.classList.contains("em-is-active")) {
      element.classList.remove("em-is-active");
      element.setAttribute("aria-expanded", "false");
      element.setAttribute("aria-current", "false");
      dropdownPanel.classList.remove("em-is-active");
      dropdownPanel.setAttribute("aria-hidden", "true");
      dropdownPanel.setAttribute("aria-current", "false");
      if (headerNode) headerNode.classList.remove("em-is-active");
    } else {
      var dropdownTriggers = document.querySelectorAll(".em-js-nav-dropdown-trigger");
      for (let i = 0; i < dropdownTriggers.length; i++) {
        dropdownTriggers[i].classList.remove("em-is-active");
        dropdownTriggers[i].setAttribute("aria-expanded", "false");
        dropdownTriggers[i].setAttribute("aria-current", "false");
      }
      var dropdownPanels = document.querySelectorAll(".em-js-nav-dropdown");
      for (let i = 0; i < dropdownPanels.length; i++) {
        dropdownPanels[i].classList.remove("em-is-active");
        dropdownPanels[i].setAttribute("aria-hidden", "true");
        dropdownPanels[i].setAttribute("aria-current", "false");
      }
      element.classList.add("em-is-active");
      element.setAttribute("aria-expanded", "true");
      element.setAttribute("aria-current", "true");
      dropdownPanel.classList.add("em-is-active");
      dropdownPanel.setAttribute("aria-hidden", "false");
      dropdownPanel.setAttribute("aria-current", "true");
      if (headerNode) headerNode.classList.add("em-is-active");
    }
  }
};
exports.initializePrimaryNav = initializePrimaryNav;

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeRangeSlider = void 0;
/**
 * Range slider value update
 * 1) Addd all the sliders to slider var
 * 2) Update slider label value based on the slider handle, addEventListener change for IE
 * 3) Slider value works on multiple option list items
 */
const initializeRangeSlider = () => {
  var slider = document.querySelectorAll(".em-js-range-slider");
  for (let i = 0; i < slider.length; i++) {
    slider[i].addEventListener("input", function () {
      var slidervalue = this.lastElementChild;
      var slideroutput = this.firstElementChild.lastElementChild;
      slideroutput.innerText = slidervalue.value;
    });
    slider[i].addEventListener("change", function () {
      var slidervalue = this.lastElementChild;
      var slideroutput = this.firstElementChild.lastElementChild;
      slideroutput.innerText = slidervalue.value;
    });
  }
};
exports.initializeRangeSlider = initializeRangeSlider;

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeSectionExpandable = void 0;
/**
 * Expandable section
 * 1) Add active state to the parent if trigger is clicked when section is collapsed
 * 2) Remove active state if trigger is clicked when section is expanded
 * 3) Add false for aria-expanded to button, and add true for aria-hidden to content div.
 * 4) Add true for aria-expanded to button, and add false for aria-hidden to content div.
 */

const initializeSectionExpandable = () => {
  var sectionHeader = document.querySelectorAll(".em-js-section-trigger");
  for (let i = 0; i < sectionHeader.length; i++) {
    sectionHeader[i].parentNode.classList.add("em-is-closed"); // 1
    sectionHeader[i].addEventListener("click", function () {
      var thisParent = this.parentNode;
      if (thisParent.classList.contains("em-is-closed")) {
        thisParent.classList.remove("em-is-closed"); // 2
        this.setAttribute("aria-expanded", true); // 4
        this.nextSibling.setAttribute("aria-hidden", false);
      } else {
        thisParent.classList.add("em-is-closed");
        this.setAttribute("aria-expanded", false); // 3
        this.nextSibling.setAttribute("aria-hidden", true);
      }
    });
  }
};
exports.initializeSectionExpandable = initializeSectionExpandable;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeShowHide = void 0;
/**
 * Show/Hide
 * 1) Clicking a trigger toggles the visibility of the target and changes the trigger's label
 */

const initializeShowHide = () => {
  // Triggers
  var triggers = document.querySelectorAll(".em-js-show-hide-trigger");
  var targets = document.querySelectorAll(".em-js-show-hide-target");
  for (let i = 0; i < targets.length; i++) {
    targets[i].classList.add("em-u-is-hidden");
  }
  for (let i = 0; i < triggers.length; i++) {
    triggers[i].setAttribute("data-show-hide-initial-label", triggers[i].innerText);
  }
  var displayContent = function (trigger, target) {
    if (target.classList.contains("em-u-is-hidden")) {
      // Show target
      target.classList.remove("em-u-is-hidden");
      trigger.setAttribute("aria-expanded", "true");
      target.setAttribute("aria-hidden", "false");
      let btnText = trigger.querySelector(".em-js-btn-text");
      btnText.innerText = trigger.getAttribute("data-show-hide-label");
    } else {
      // Hide target
      target.classList.add("em-u-is-hidden");
      trigger.setAttribute("aria-expanded", "false");
      target.setAttribute("aria-hidden", "true");
      let btnText = trigger.querySelector(".em-js-btn-text");
      btnText.innerText = trigger.getAttribute("data-show-hide-initial-label");
    }
  };
  [].forEach.call(triggers, function (trigger, index) {
    // Target var
    var target = trigger.nextElementSibling;

    // Set trigger attributes
    trigger.setAttribute("id", "trigger-" + index);
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", "content-" + index);

    // Set target attributes
    target.setAttribute("id", "content-" + index);
    target.setAttribute("aria-hidden", "true");
    target.setAttribute("aria-labelledby", "trigger-" + index);
    trigger.addEventListener("click", function () {
      displayContent(this, target);
      return false;
    }, false);
    trigger.addEventListener("keydown", function (event) {
      // Handle 'space' key
      if (event.which === 32) {
        event.preventDefault();
        displayContent(this, target);
      }
    }, false);
  });
};
exports.initializeShowHide = initializeShowHide;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeTable = void 0;
/**
 * Table Active Rows Activation
 * 1) Add and remove active class to tabs depending on which one you click on
 * 2) Add the id to the URL
 * 3) Add active class to the first tab and panel by default
 */
const initializeTable = () => {
  var tableRow = document.querySelectorAll(".em-js-table-row-selectable");
  for (let i = 0; i < tableRow.length; i++) {
    tableRow[i].addEventListener("click", function (e) {
      this.classList.toggle("em-is-active");
    });
  }
};
exports.initializeTable = initializeTable;

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeTabs = void 0;
/**
 * Tabs Activation
 * 1) Add active class to the first tab and panel by default
 * 2) Add and remove active class to tabs depending on which one you click on
 */

const initializeTabs = () => {
  var tabContainer = document.querySelectorAll(".em-js-tabs");
  var tabBtn = document.querySelectorAll(".em-js-tab");
  for (let i = 0; i < tabContainer.length; i++) {
    var tabFirst = tabContainer[i].querySelector(".em-js-tab:first-child");
    var tabPanelFirst = tabContainer[i].querySelector(".em-js-tabs-panel:first-child");
    tabFirst.classList.add("em-is-active"); /* 1 */
    tabPanelFirst.classList.add("em-is-active"); /* 1 */
    tabFirst.setAttribute("aria-selected", true);
  }
  for (let i = 0; i < tabBtn.length; i++) {
    tabBtn[i].addEventListener("click", function (e) {
      e.preventDefault();
      openTab(this);
    });
  }
  function openTab(el) {
    let thisHref = el.getAttribute("href");
    var tabParent = el.parentNode.parentNode.parentNode;
    var tabBtns = tabParent.querySelectorAll(".em-js-tab");
    for (let j = 0; j < tabBtns.length; j++) {
      tabBtns[j].classList.remove("em-is-active"); /* 2 */
      tabBtns[j].setAttribute("aria-selected", false);
    }
    el.classList.add("em-is-active"); /* 2 */
    el.setAttribute("aria-selected", true);
    var newHref = document.querySelector(thisHref);
    var newerHref = newHref.querySelector(".em-js-tabs-panel");
    var firstLink = newHref.querySelector(".em-js-tab");
    if (firstLink) {
      firstLink.classList.add("em-is-active");
      firstLink.setAttribute("aria-selected", false);
    }
    var tabsPanel = tabParent.querySelectorAll(".em-js-tabs-panel");
    for (let j = 0; j < tabsPanel.length; j++) {
      tabsPanel[j].classList.remove("em-is-active"); /* 2 */
      if (newerHref) {
        newerHref.classList.add("em-is-active");
        newerHref.setAttribute("aria-selected", false);
      }
    }
    document.querySelector(thisHref).classList.add("em-is-active"); /* 2 */
  }
};
exports.initializeTabs = initializeTabs;

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeTags = void 0;
const initializeTags = () => {
  var tagsTrigger = document.querySelectorAll(".em-js-tags-trigger");

  //Add click event for each tag icon
  for (let j = 0; j < tagsTrigger.length; j++) {
    tagsTrigger[j].addEventListener("click", event => {
      event.preventDefault();
      var parent = tagsTrigger[j].parentNode;
      var parentParents = parent.parentNode;
      //var parentGrandparents = parentParents?.parentNode;
      parentParents === null || parentParents === void 0 || parentParents.remove(); //Regular remove() does not work in IE

      // if (parentGrandparents?.hasChildNodes() == false) {
      //   parentGrandparents.remove();
      // }
    });
  }
};
exports.initializeTags = initializeTags;

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeTree = void 0;
const initializeTree = () => {
  /**
   * First Level Tree Navigation Dropdown Toggle
   * 1) Remove class of em-is-active of tree dropdown trigger and tree nav panel if tree dropdown trigger contains active class
   * 2) Add class of em-is-active of tree dropdown trigger and tree nav panel if tree dropdown if tree dropdown does not contain active class
   * 3) Add ARIA attributes showing hidden, selected, and expanded classes depending on whether the nav is active or not
   */

  var treeTrigger = document.querySelectorAll(".em-js-tree-dropdown-trigger");
  for (let i = 0; i < treeTrigger.length; i++) {
    treeTrigger[i].addEventListener("click", function (e) {
      e.preventDefault();
      var treePanel = this.nextElementSibling;
      if (this.classList.contains("em-is-active")) {
        this.classList.remove("em-is-active"); /* 1 */
        this.setAttribute("aria-expanded", "false"); /* 3 */
        this.setAttribute("aria-current", "false"); /* 3 */
        treePanel.classList.remove("em-is-active"); /* 1 */
        treePanel.setAttribute("aria-hidden", "true"); /* 3 */
        treePanel.setAttribute("aria-current", "false"); /* 3 */
      } else {
        this.classList.add("em-is-active"); /* 2 */
        this.setAttribute("aria-expanded", "true"); /* 3 */
        this.setAttribute("aria-current", "true"); /* 3 */
        treePanel.classList.add("em-is-active"); /* 2 */
        treePanel.setAttribute("aria-hidden", "false"); /* 3 */
        treePanel.setAttribute("aria-current", "true"); /* 3 */
      }
    });
  }
};
exports.initializeTree = initializeTree;

},{}]},{},[9]);
