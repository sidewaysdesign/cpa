class WPFormsConfPopups {
  constructor(params) {
    this.events(params);
  }

  events(params) {
    const paramsArray = [].concat(params);
    paramsArray.forEach((p) => this.initModule(p));
  }

  initModule({ targetSelector, popupSelector }) {
    const targets = document.querySelectorAll(targetSelector);
    targets.forEach((target) => {
      this.applyMinHeight(target);
      let formHTML = target.innerHTML; // Make formHTML mutable
      let submitButton = target.querySelector('input[type="submit"], button[type="submit"]');
      if (submitButton) {
        submitButton.addEventListener("click", () => {
          formHTML = target.innerHTML;
        });
      }

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            const popup = mutation.target.querySelector(popupSelector);
            if (popup) {
              this.activatePopup(popup);
              observer.disconnect();
              this.disableForm(target, formHTML);
            }
          }
        });
      });

      observer.observe(target, { childList: true });
    });

    // affix
    window.addEventListener("resize", () => {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(() => {
        targets.forEach((target) => {
          this.applyMinHeight(target);
        });
      }, 200);
    });
  }
  disableForm(target, formHTML) {
    const disabledForm = document.createElement("div");
    disabledForm.innerHTML = formHTML;
    disabledForm.style.opacity = "0.45";
    disabledForm.style.pointerEvents = "none"; // Prevent all pointer events

    disabledForm.removeAttribute("id");
    Array.from(disabledForm.attributes).forEach((attr) => {
      if (attr.name.startsWith("data-")) {
        disabledForm.removeAttribute(attr.name);
      }
    });

    disabledForm.querySelectorAll("input, button").forEach((element) => {
      element.disabled = true;
    });
    target.appendChild(disabledForm);
  }
  applyMinHeight(target) {
    const height = target.offsetHeight;
    target.style.minHeight = `${height}px`;
  }
  activatePopup(popup) {
    // Add the "active" class for the animated transition
    popup.classList.add("active");
    const lang = document.documentElement.lang;

    // Insert a close button
    const closeButton = document.createElement("button");
    closeButton.classList.add("closex");
    closeButton.addEventListener("click", () => this.deactivatePopup(popup));
    closeButton.setAttribute("aria-label", lang === "fr" ? "Fermer" : "Close");
    popup.setAttribute("role", "dialog");
    popup.setAttribute("aria-modal", "true");

    popup.appendChild(closeButton);

    popup.setAttribute("aria-live", "assertive");
    popup.setAttribute("tabindex", "-1");
    popup.focus();

    // Add event listener for keyboard dismissal
    popup.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.deactivatePopup(popup);
      }
    });

    // Add event listener for clicking outside the popup
    document.addEventListener("click", (event) => {
      if (!popup.contains(event.target)) {
        this.deactivatePopup(popup);
      }
    });
  }
  deactivatePopup(popup) {
    popup.classList.remove("active");
    setTimeout(() => {
      popup.remove();
    }, 500);
  }
}

export { WPFormsConfPopups };
