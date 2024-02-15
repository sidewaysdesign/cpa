export class WPFormsMaxWords {
  constructor() {
    this.maxedFieldSelector = "[data-text-limit]";
    this.maxedClass = "warning-maxwords-count";
    this.isFrench = document.documentElement.lang.startsWith("fr");
    this.ariaLiveText = this.isFrench ? "Nombre maximal de mots atteint" : "Maximum word count reached";
    this.init();
  }

  init() {
    const maxedFields = document.querySelectorAll(this.maxedFieldSelector);
    if (!maxedFields.length) return;
    maxedFields.forEach((field) => {
      this.addWordCountListener(field);
    });
  }

  addWordCountListener(field) {
    const maxedFieldCount = parseInt(field.getAttribute("data-text-limit")) || 0;
    if (!maxedFieldCount) return;
    const limitTextElement = field.closest(".wpforms-field").querySelector(".wpforms-field-limit-text");

    ["input", "paste"].forEach((eventType) => {
      field.addEventListener(eventType, () => {
        setTimeout(() => {
          this.checkWordCount(field, maxedFieldCount);
        }, 0);
      });
    });
  }

  checkWordCount(field, maxedFieldCount) {
    const wordCount = field.value.split(" ").length;
    const isMaxed = wordCount >= maxedFieldCount;
    field.classList.toggle(this.maxedClass, isMaxed);

    // Find or create the aria-live region
    let liveRegion = field.parentNode.querySelector(".live-region");
    if (!liveRegion) {
      liveRegion = this.createLiveRegion(field.id);
      field.parentNode.appendChild(liveRegion);
    }

    // Update the aria-live region and associate it with the field
    const warningPhrase = this.isFrench ? "Nombre maximum de mots atteint." : "Maximum word count reached.";
    liveRegion.textContent = isMaxed ? warningPhrase : "";
    field.setAttribute("aria-describedby", liveRegion.id);
  }

  createLiveRegion(fieldId) {
    // Create the aria-live region
    let liveRegion = document.createElement("div");
    liveRegion.id = "live-region-" + fieldId;
    liveRegion.className = "live-region sr-only";
    liveRegion.setAttribute("aria-live", "polite");
    return liveRegion;
  }

  destroyLiveRegion(field) {
    let liveRegion = field.parentNode.querySelector(".live-region");
    if (liveRegion) {
      liveRegion.parentNode.removeChild(liveRegion);
    }
  }
}
