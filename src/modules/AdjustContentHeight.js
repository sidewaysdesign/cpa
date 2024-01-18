class AdjustContentHeight {
  constructor(params) {
    // this.debouncedResize = this.debounce(this.AdjustContentHeight.bind(this), 100)
    this.slideParentClassName = "wp-block-gutsliders-slide";
    this.events(params);
    this.delayTime = 250;
  }

  events(params) {
    const paramsArray = [].concat(params);
    paramsArray.forEach((p) => this.initModule(p));
  }

  initModule(module) {
    const rootTargets = document.querySelectorAll(module.rootTargetSelector);

    rootTargets.forEach((rootTarget, sliderSelector) => {
      if (rootTarget) {
        const targets = rootTarget.querySelectorAll(module.sliderSelector);

        targets.forEach((target) => {
          if (target.children.length > 0) {
            // Delay the execution of AdjustContentHeight by 2 seconds
            setTimeout(() => {
              this.AdjustContentHeight(target, module.sliderSelector, module.innerSelector);
            }, this.delayTime);
          } else {
            setTimeout(() => {
              this.initModule(module);
            }, 500);
          }
        });

        // Add a debounced resize event listener that waits 2 seconds before calling AdjustContentHeight
        window.addEventListener(
          "resize",
          this.debounce(() => {
            targets.forEach((target) => {
              setTimeout(() => {
                this.AdjustContentHeight(target, module.sliderSelector, module.innerSelector);
              }, this.delayTime);
            });
          }, 250),
        );
      }
    });
  }

  AdjustContentHeight(target, sliderSelector, innerSelector) {
    const uniqueId = "unique-id-" + Math.random().toString(36).substring(2, 15);
    const slider = target.closest(sliderSelector);
    const children = Array.from(slider.querySelectorAll(innerSelector));

    const heights = children.map((child) => this.getNaturalHeight(child));
    const maxHeight = Math.max(...heights);

    // Find the root ancestor with the attribute 'data-swiper-options'
    const rootParent = target.closest("[data-swiper-options]");

    // target’s parent
    const parent = target.parentNode;
    if (rootParent && parent) {
      const parentStyle = window.getComputedStyle(parent);
      const parentPaddingTop = parseFloat(parentStyle.paddingTop);
      const parentPaddingBottom = parseFloat(parentStyle.paddingBottom);
      // Add a unique id to the ancestor elements and parent
      rootParent.id = uniqueId;
      parent.id = `${uniqueId}-parent`;

      // Check if a style element for the ancestor elements and parent already exists
      let style = document.querySelector(`style[data-for="${uniqueId}"]`);

      // If the style element exists, remove it
      if (style) {
        style.remove();
      }

      // Create a new style element and append it to the document head
      style = document.createElement("style");
      style.setAttribute("data-for", `${uniqueId}`);
      document.head.appendChild(style);
      style.textContent = `
      #${uniqueId} .wp-block-gutsliders-slide {
        height: ${maxHeight + parentPaddingTop + parentPaddingBottom}px !important;
      }
      #${uniqueId} ${sliderSelector} {
        height: ${maxHeight + parentPaddingTop + parentPaddingBottom}px !important;
      }
    `;
    }
  }
  getNaturalHeight(target) {
    // Clone the target element
    const clone = target.cloneNode(true);

    // Position the clone in the center of the screen with a high z-index
    clone.style.position = "fixed";
    clone.style.left = "-9999px";

    // Copy over the computed styles
    const style = window.getComputedStyle(target);
    Array.from(style).forEach((prop) => {
      clone.style[prop] = style.getPropertyValue(prop);
    });

    // Preserve the width
    clone.style.width = `${target.getBoundingClientRect().width}px`;
    document.body.appendChild(clone);
    const contentHeight = clone.getBoundingClientRect().height;

    document.body.removeChild(clone);

    return contentHeight;
  }
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}
export { AdjustContentHeight };
