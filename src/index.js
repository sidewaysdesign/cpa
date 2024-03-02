import "../css/style.scss";
import { PersonnelPopup } from "./modules/PersonnelPopup";
import { ComboboxExpander } from "./modules/ComboboxExpander";
import { SocialCopyToClipboardLink } from "./modules/SocialCopyToClipboardLink";
import { AddAriaHidden } from "./modules/AddAriaHidden";
import { FAQSmoothHeightTransition } from "./modules/FAQSmoothHeightTransition";
import { InsertFooterPaddingElement } from "./modules/InsertFooterPaddingElement";
import { HandleCurrentMenuItem } from "./modules/HandleCurrentMenuItem";
import { MobileMenu } from "./modules/MobileMenu";
import { ScrollAnimations } from "./modules/ScrollAnimations";
import { AdjustContentHeight } from "./modules/AdjustContentHeight";
import { PlayPauseButton } from "./modules/PlayPauseButton";
// import { MobileMenuTopLevel } from "./modules/MobileMenuTopLevel";
import { PersonnelNameAlignment } from "./modules/PersonnelNameAlignment";
import { SiteEditHotkey } from "./modules/SiteEditHotkey";
import { LinkPreventDefault } from "./modules/LinkPreventDefault";
import { WPFormsConfPopups } from "./modules/WPFormsConfPopups";
import { LoginMenuMatchWidth } from "./modules/LoginMenuMatchWidth";
import { WPFormsMaxWords } from "./modules/WPFormsMaxWords";
import { ForceTabindexNoHref } from "./modules/ForceTabindexNoHref";
import { ReleaseNavMenuFocus } from "./modules/ReleaseNavMenuFocus";

const forceMenuOpen = () => {
  const menu = document.querySelector(".wp-block-navigation__responsive-container");
  const body = document.querySelector("body");
  menu.classList.add("has-modal-open");
  menu.classList.add("is-menu-open");
  body.classList.add("has-modal-open");
};
const onReady = () => {
  console.log(location.hostname, location.hostname.includes(".local"));
  if (location.hostname === "localhost" || location.hostname.includes(".local")) {
    document.body.classList.add("localhost");
    var siteEditHotkey = new SiteEditHotkey();
    // const delayedMenuOpen = setTimeout(forceMenuOpen, 750);
  }
  var handleCurrentMenuItem = new HandleCurrentMenuItem();
  var forceTabindexNoHref = new ForceTabindexNoHref();

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
  var scrollAnimations = new ScrollAnimations([
    {
      targetSelector:
        ".wp-block-post-content >*:not(:first-child, .scrollindicator-link, .has-custom-accent-yellow-background-color, #alert-banner)",
      action: "fadeup",
    },
  ]);
  var loginMenuMatchWidth = new LoginMenuMatchWidth();
  var wPFormsMaxWords = new WPFormsMaxWords();
  var socialCopyToClipboardLink = new SocialCopyToClipboardLink([{ targetSelector: "main .wp-block-social-links" }]);
  var addAriaHidden = new AddAriaHidden([{ targetSelector: ".is-style-aria-hidden" }]);
  var faqSmoothHeightTransition = new FAQSmoothHeightTransition();
  var insertFooterPaddingElement = new InsertFooterPaddingElement();
  var personnelNameAlignment = new PersonnelNameAlignment([
    { unitSelector: ".personnel-unit--wrapper", targetSelector: ".personnelcard--titlearea" },
  ]);
  var releaseNavMenuFocus = new ReleaseNavMenuFocus([
    {
      menuTopSelector:
        ".wp-block-navigation__responsive-container-content > .wp-block-navigation__container > .wp-block-navigation-submenu",
      targetSelector: "a[href*='#']",
    },
  ]);
  // var mobileMenuTopLevel = new MobileMenuTopLevel([
  //   {
  //     targetSelector:
  //       ".wp-block-navigation__responsive-container .wp-block-navigation__container > .wp-block-navigation-item.has-child > a",
  //   },
  // ]);
  var linkPreventDefault = new LinkPreventDefault([
    {
      targetSelector: ".wp-block-navigation-item.is-style-button-style > a[href='#']",
    },
  ]);
  var mobileMenu = new MobileMenu({
    menuSelector: "header .wp-block-navigation .wp-block-navigation__responsive-container",
    triggerSelector: ".wp-block-navigation-submenu.has-child > .wp-block-navigation-item__content",
    openClass: "active",
    menuIsOpenClass: "has-modal-open",
    menuCloseButtonSelector: ".wp-block-navigation__responsive-container-close",
    passThroughClass: "mobile-click",
  });

  var adjustContentHeight = new AdjustContentHeight([
    {
      rootTargetSelector: ".wp-block-gutsliders-any-content",
      sliderSelector: ".swiper-wrapper",
      innerSelector: ".gutslider-content-inner",
    },
  ]);
  var playPauseButton = new PlayPauseButton({
    targetSelector: ".homepage-hero",
    isPreview: false,
    ariaHidden: false,
  });
  var wpFormsConfPopups = new WPFormsConfPopups([
    {
      targetSelector: ".wpforms-container",
      popupSelector: ".wpforms-confirmation-container-full",
    },
  ]);
  // var constructPopup = new ConstructPopup([{ triggerSelector: '.youtube-popup' }])
  // var awardsVideoLoader = new AwardsVideoLoader([{ targetSelector: '#videoContainer' }])
};
if (document.readyState !== "loading") {
  onReady();
} else {
  document.addEventListener("DOMContentLoaded", onReady);
}
