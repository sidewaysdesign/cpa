class SinglePopup {
  constructor(params) {
    this.events(params);
  }
  events(params) {
    const paramsArray = [].concat(params);
    paramsArray.forEach((p) => this.popupInit(p));
  }
  popupInit({
    triggerSelector,
    targetSelector,
    appearClass = "fadein",
    activeClass = "active",
    removeClass = "fadeout",
    closeButtonClass = "closex",
    wrapperClass = "singlepopup--wrapper",
    containerClass = "singlepopup--container",
    delay = 750,
    createCloseButton = false,
    maxWidth = null,
  }) {
    const popupTriggers = document.querySelectorAll(triggerSelector);

    popupTriggers.forEach((trigger) => {
      const target = document.querySelector(targetSelector);
      trigger.style.cursor = "pointer";
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        clonePanel(target);
      });
    });

    const clonePanel = (panel) => {
      const newPanel = panel.cloneNode(true);
      newPanel.classList.add("singlepopup--showing");
      const popupWrapper = document.createElement("div");
      popupWrapper.classList.add(wrapperClass);
      const popupContainer = document.createElement("div");
      popupContainer.classList.add(containerClass);
      if (maxWidth) popupContainer.style.maxWidth = maxWidth;

      popupWrapper.appendChild(popupContainer);
      popupContainer.appendChild(newPanel);

      if (createCloseButton) {
        const newClosebutton = createCloseButtonElement(closeButtonClass);
        popupContainer.appendChild(newClosebutton);
      }

      document.body.appendChild(popupWrapper);

      appearPanel(popupWrapper, newPanel);
    };

    const createCloseButtonElement = (buttonClass) => {
      const closeButton = document.createElement("div");
      closeButton.classList.add(buttonClass);
      closeButton.setAttribute("aria-label", "Close");
      return closeButton;
    };
    const appearPanel = (panel, newPanel) => {
      const scrollPosition = `-${window.scrollY}px`;
      document.body.style.position = "fixed";
      document.body.style.top = scrollPosition;

      newPanel.style.removeProperty("display");

      const closex = panel.querySelector(`.${closeButtonClass}`);
      const closeBg = initCloseBg();
      panel.prepend(closeBg);
      closeBg.addEventListener("click", (e) => {
        removePanel(panel, scrollPosition);
      });
      if (closex) closex.addEventListener("click", (e) => removePanel(panel));
      window.addEventListener("keydown", handleKeypress(panel), false);
      setTimeout(() => {
        panel.classList.add(activeClass);
      }, 1);
    };
    const initCloseBg = () => {
      const co = document.createElement("div");
      co.style.cssText = "background-color:transparent; position:absolute; top:0; left:0; width:100%; height:100%;";
      return co;
    };
    const removePanel = (panel, scrollPosition) => {
      const transferScrollPos = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(document.body.style.left, parseInt(transferScrollPos) * -1);

      panel.classList.remove(activeClass);
      setTimeout(() => panel.remove(), delay);
      window.removeEventListener("keypress", handleKeypress);
    };
    function handleKeypress(panel) {
      return function (e) {
        if (e.key === "Escape") removePanel(panel);
      };
    }
    const freezeInPlace = (el) => {
      const { top, left, width, height } = el.getBoundingClientRect();
      el.style.top = `${top}px`;
      el.style.left = `${left}px`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.position = "fixed";
    };
  }
}

export { SinglePopup };
