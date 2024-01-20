class PersonnelNameAlignment {
  constructor(params) {
    this.events(params);
  }

  events(params) {
    const paramsArray = [].concat(params);
    paramsArray.forEach((p) => this.initModule(p));
  }

  initModule({ targetSelector, unitSelector }) {
    const unitSelection = document.querySelectorAll(unitSelector);
    if (!unitSelection.length) return;
    const units = Array.from(unitSelection);
    const sets = [...new Set(units.map((unit) => unit.parentElement))];
    sets.forEach((set) => {
      this.alignHeights(set, targetSelector);
      window.addEventListener(
        "resize",
        this.debounce(() => this.alignHeights(set, targetSelector), 250),
      );
    });
  }

  alignHeights(set, targetSelector) {
    const targets = Array.from(set.querySelectorAll(targetSelector));
    if (!targets.length) return;
    targets.forEach((target) => (target.style.height = "")); // reset height

    const heights = targets.map((target) => {
      const style = window.getComputedStyle(target);
      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);
      return target.offsetHeight + paddingTop + paddingBottom;
    });
    const maxHeight = Math.max(...heights);
    targets.forEach((target) => (target.style.height = `${maxHeight}px`));
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

export { PersonnelNameAlignment };
