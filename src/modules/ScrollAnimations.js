class ScrollAnimations {
  constructor(params) {
    this.params = params;
    this.animationActions = {
      fadeup: {
        initStyles: "opacity: 0; transform: translateY(20px); transition: opacity 1s, transform 1s;",
        activeStyles: "opacity: 1; transform: translateY(0);",
      },
      // Add more actions as needed
    };
    this.addStyles();
    this.events(params);
  }

  addStyles() {
    const style = document.createElement("style");
    const uniqueActions = [...new Set(this.params.map((p) => p.action))];
    uniqueActions.forEach((action) => {
      if (this.animationActions[action]) {
        style.textContent += `
          .${action} {
            ${this.animationActions[action].initStyles}
          }
          .${action}.active {
            ${this.animationActions[action].activeStyles}
          }
        `;
      } else {
        console.log(`Action ${action} not recognized`);
      }
    });
    document.head.append(style);
  }

  events(params) {
    const paramsArray = [].concat(params);
    paramsArray.forEach((p) => this.initModule(p));
  }
  initModule({ targetSelector, action }) {
    const targetElements = document.querySelectorAll(targetSelector);
    targetElements.forEach((target) => target.classList.add(action));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    });

    targetElements.forEach((target) => observer.observe(target));
  }
}

export { ScrollAnimations };
