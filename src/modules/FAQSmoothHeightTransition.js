class FAQSmoothHeightTransition {
  constructor() {
    this.details = this.getDetails();
    this.init();
  }

  getDetails() {
    const faqs = document.querySelectorAll(".is-style-faqs, .details-claimsprocess .wp-block-details");
    return Array.from(faqs).map((faq) => {
      const summary = faq.querySelector("summary");
      const payload = document.createElement("div");
      Array.from(faq.querySelectorAll("summary ~ *")).forEach((el) => {
        payload.appendChild(el.cloneNode(true));
        el.parentNode.removeChild(el); // Remove the original element
      });
      faq.insertBefore(payload, faq.children[1]); // Insert the payload div after the summary
      return { summary, payload };
    });
  }
  init() {
    this.details.forEach((detail) => {
      detail.summary.addEventListener("click", () => this.handleSummaryClick(detail));
      this.setMaxHeight(detail);
      window.addEventListener("resize", () => this.setMaxHeight());
    });
  }

  setMaxHeight(detail) {
    if (!detail || !detail.payload) return;
    detail.payload.style.maxHeight = null; // Remove inline max-height
    const clone = detail.payload.cloneNode(true);
    clone.style.visibility = "hidden";
    clone.style.display = "block";
    document.body.appendChild(clone);
    const height = clone.scrollHeight;
    document.body.removeChild(clone);

    // Add the top margin of the first child and the bottom margin of the last child
    const styleFirst = window.getComputedStyle(clone.children[0]);
    const styleLast = window.getComputedStyle(clone.children[clone.children.length - 1]);
    const marginTop = parseFloat(styleFirst.marginTop);
    const marginBottom = parseFloat(styleLast.marginBottom);
    const totalHeight = height + marginTop + marginBottom;

    detail.payload.style.maxHeight = `${totalHeight}px`; // Set max-height to scrollHeight plus margins
  }

  handleSummaryClick(detail) {
    if (detail.summary.parentElement.hasAttribute("open")) {
      const transitionDuration = parseFloat(window.getComputedStyle(detail.payload[0]).transitionDuration) * 1000;
      setTimeout(() => {
        detail.payload.forEach((el) => (el.style.maxHeight = null));
      }, transitionDuration);
    } else {
      this.setMaxHeight(detail);
    }
  }
}

export { FAQSmoothHeightTransition };
