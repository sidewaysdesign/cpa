class ReleaseNavMenuFocus {
  constructor(params) {
    this.events(params);
  }

  events(params) {
    const paramsArray = [].concat(params);
    paramsArray.forEach((p) => this.initModule(p));
  }

  initModule({ menuTopSelector, targetSelector }) {
    const menuTopElements = document.querySelectorAll(menuTopSelector);

    if (menuTopElements.length === 0) return;

    menuTopElements.forEach((menuTopElement) => {
      const targetElements = menuTopElement.querySelectorAll(targetSelector);

      if (targetElements.length === 0) return;

      targetElements.forEach((targetElement) => {
        ["click", "touchend"].forEach((eventType) => {
          // Skip if the targetElement has the class "has-modal-open"
          targetElement.addEventListener(eventType, () => this.clearMenu(menuTopElement, targetElement));
        });
      });
    });
  }
  clearMenu(menuTopElement, targetElement) {
    if (document.documentElement.classList.contains("has-modal-open")) {
      // do not worry about clearing menu if the mobile modal is open
      return;
    }

    const directParentMenu = targetElement.closest(".wp-block-navigation__submenu-container");
    if (!directParentMenu) return;

    const origDisplayState = directParentMenu.style.display;
    directParentMenu.style.display = "none";
    setTimeout(() => {
      void directParentMenu.offsetWidth;
      directParentMenu.style.display = origDisplayState;
    }, 150);
  }
}

export { ReleaseNavMenuFocus };
