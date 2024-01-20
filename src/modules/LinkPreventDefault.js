class LinkPreventDefault {
  constructor(params) {
    this.events(params);
  }

  events(params) {
    const paramsArray = [].concat(params);
    paramsArray.forEach((p) => this.initModule(p));
  }

  initModule({ targetSelector }) {
    const items = document.querySelectorAll(targetSelector);
    items.forEach((item) => {
      item.setAttribute("role", "button");
      ["click", "touchend"].forEach((eventType) => {
        item.addEventListener(eventType, (e) => {
          e.preventDefault();
          // code to open the menu
        });
      });
    });
  }
}

export { LinkPreventDefault };
