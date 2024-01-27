// .wp-block-details.is-style-popup-menu

class MobileMenuTopLevel {
  constructor(params) {
    this.events(params);
  }

  events(params) {
    const paramsArray = [].concat(params);
    paramsArray.forEach((p) => this.initModule(p));
  }

  initModule({ targetSelector }) {
    const topLevelMenuItems = document.querySelectorAll(targetSelector);
    topLevelMenuItems.forEach((item) => {
      ["click", "touchend"].forEach((eventType) => {
        item.addEventListener(eventType, (e) => {
          e.preventDefault();
          if (item.href && item.href !== "#") {
            window.location.href = item.href;
          }
        });
      });
    });
  }
}

export { MobileMenuTopLevel };
