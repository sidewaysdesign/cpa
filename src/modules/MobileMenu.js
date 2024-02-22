class MobileMenu {
  constructor(params) {
    this.events(params);
  }

  events(params) {
    const paramsArray = [].concat(params); /* force array if is single value */
    paramsArray.forEach((p) => this.openMenu(p));
  }
  openMenu({
    menuSelector,
    triggerSelector,
    openClass = "active",
    menuIsOpenClass,
    menuCloseButtonSelector,
    passThroughClass = "",
  }) {
    const menu = document.querySelector(menuSelector);
    if (!menu) {
      console.log("MobileMenu: cannot find menu");
      return;
    }
    const triggers = menu.querySelectorAll(triggerSelector);
    if (!triggers) {
      console.log("MobileMenu: cannot find menu trigger elements");
      return;
    }
    triggers.forEach((trigger) => {
      const events = ["click", "touchend"];

      events.forEach((event) => {
        trigger.addEventListener(event, (e) => {
          if (!menu.classList.contains(menuIsOpenClass)) return;
          if (
            !trigger.parentElement.classList.contains(passThroughClass) &&
            (e.target === trigger || e.target.parentElement === trigger)
          ) {
            e.preventDefault();
            e.stopPropagation();
          }
          // trigger.nextSibling.style.border = "2px solid red";
          if (trigger.parentElement.classList.contains(openClass)) {
            trigger.nextSibling.setAttribute("aria-expanded", "false");
            trigger.parentNode.classList.remove(openClass);
          } else {
            const openSiblings = getSiblings(trigger.parentNode);
            if (openSiblings) openSiblings.forEach((s) => s.classList.remove(openClass));
            trigger.nextSibling.setAttribute("aria-expanded", "true");
            trigger.parentNode.classList.add(openClass);
          }
        });
      });
    });
    const cleanUpOpenedSubmenus = () => triggers.forEach((trigger) => trigger.parentNode.classList.remove(openClass));

    /* clean up opened submenus */
    const closeButton = menu.querySelector(menuCloseButtonSelector);
    if (closeButton) {
      closeButton.addEventListener("click", (e) => {
        cleanUpOpenedSubmenus();
      });
      /* close when reizing window while modal menu is open */
      const cleanupMenu = () => {
        if (!menu.classList.contains(menuIsOpenClass)) return;
        menu.classList.remove(menuIsOpenClass);
        document.activeElement.blur();
        closeButton.click();
      };
      window.addEventListener(
        "resize",
        debounce(() => debounce(cleanupMenu(), 250)),
      );
    }
    function debounce(func, delay = 100) {
      var timer;
      return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, delay, event);
      };
    }
    function getSiblings(elem) {
      let siblings = [];
      var sibling = elem.parentNode.firstChild;
      while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
          siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
      }
      return siblings;
    }
  }
}

export { MobileMenu };
