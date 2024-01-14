import "../css/style.scss";
import { PersonnelPopup } from "./modules/PersonnelPopup";
import { ComboboxExpander } from "./modules/ComboboxExpander";
import { SocialCopyToClipboardLink } from "./modules/SocialCopyToClipboardLink";
import { AddAriaHidden } from "./modules/AddAriaHidden";
import { FAQSmoothHeightTransition } from "./modules/FAQSmoothHeightTransition";
import { InsertFooterPaddingElement } from "./modules/InsertFooterPaddingElement";
import { HandleCurrentMenuItem } from "./modules/HandleCurrentMenuItem";
import { MobileMenu } from "./modules/MobileMenu";
// import { AdjustContentHeight } from './modules/AdjustContentHeight'

const forceMenuOpen = () => {
  const menu = document.querySelector(".wp-block-navigation__responsive-container");
  const body = document.querySelector("body");
  menu.classList.add("has-modal-open");
  menu.classList.add("is-menu-open");
  body.classList.add("has-modal-open");
};
const onReady = () => {
  if (location.hostname === "localhost" || location.hostname.includes("cpa-plan.local")) {
    document.body.classList.add("localhost");
    // const delayedMenuOpen = setTimeout(forceMenuOpen, 750);
  }
  var handleCurrentMenuItem = new HandleCurrentMenuItem();

  var personnelPopup = new PersonnelPopup([
    {
      popupSelector: ".personnelcard--wrapper",
      targetAttribute: "data-popup",
      activeClass: "active",
      removeClass: "fadeout",
      closeButtonClass: "personnelpopup--closex",
    },
  ]);
  var comboboxExpander = new ComboboxExpander([{ targetSelector: ".wp-block-details.is-style-popup-menu" }]);
  var socialCopyToClipboardLink = new SocialCopyToClipboardLink([{ targetSelector: ".wp-block-social-links" }]);
  var addAriaHidden = new AddAriaHidden([{ targetSelector: ".is-style-aria-hidden" }]);
  var faqSmoothHeightTransition = new FAQSmoothHeightTransition();
  var insertFooterPaddingElement = new InsertFooterPaddingElement();

  var mobileMenu = new MobileMenu({
    menuSelector: "header .wp-block-navigation .wp-block-navigation__responsive-container",
    triggerSelector: ".wp-block-navigation-submenu.has-child > .wp-block-navigation-item__content",
    openClass: "active",
    menuIsOpenClass: "has-modal-open",
    menuCloseButtonSelector: ".wp-block-navigation__responsive-container-close",
  });

  // var adjustContentHeight = new AdjustContentHeight([{ targetSelector: '.gutslider-content-inner > *' }])

  // var constructPopup = new ConstructPopup([{ triggerSelector: '.youtube-popup' }])
  // var awardsVideoLoader = new AwardsVideoLoader([{ targetSelector: '#videoContainer' }])
};
if (document.readyState !== "loading") {
  onReady();
} else {
  document.addEventListener("DOMContentLoaded", onReady);
}
