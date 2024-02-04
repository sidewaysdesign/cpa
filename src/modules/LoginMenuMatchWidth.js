export class LoginMenuMatchWidth {
  constructor() {
    const loginMenu = document.querySelector(
      ".wp-block-navigation__responsive-container-content > .wp-block-navigation__container > .is-style-button-style.wp-block-navigation-submenu",
    );
    if (!loginMenu) return;
    const button = loginMenu.querySelector(".wp-block-navigation-item__content");
    const container = loginMenu.querySelector(".wp-block-navigation__submenu-container");
    if (!button || !container) return;

    // .closest(".is-style-button-style.wp-block-navigation-submenu")
    // .querySelector(".wp-block-navigation__submenu-container");

    button.addEventListener("mouseenter", function () {
      if (!document.body.classList.contains("has-modal-open")) {
        container.style.setProperty("max-width", `${button.offsetWidth}px`, "important");
      }
    });

    button.addEventListener("mouseleave", function () {
      container.style.width = "";
    });
  }
}
