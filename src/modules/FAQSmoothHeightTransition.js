class FAQSmoothHeightTransition {
  constructor() {
    this.debouncedResize = this.debounce(this.setMaxHeights.bind(this), 250)
    this.init()
  }

  init() {
    window.addEventListener('resize', this.debouncedResize)
    this.addClickListeners()
    this.setMaxHeights()
  }

  setMaxHeights() {
    const faqs = document.querySelectorAll('.is-style-faqs')
    if (faqs.length === 0) return

    faqs.forEach(faq => {
      const elements = faq.querySelectorAll('summary ~ *')
      elements.forEach(el => {
        el.style.maxHeight = `${el.scrollHeight}px`
      })
    })
  }

  addClickListeners() {
    const summaries = document.querySelectorAll('.is-style-faqs summary')
    summaries.forEach(summary => {
      summary.addEventListener('click', () => this.handleSummaryClick(summary))
    })
  }

  handleSummaryClick(summary) {
    const details = summary.parentElement
    if (details.hasAttribute('open')) {
      // Get computed style of the first sibling element
      const sibling = summary.nextElementSibling
      if (sibling) {
        const style = window.getComputedStyle(sibling)
        const transitionDuration = parseFloat(style.transitionDuration) * 1000 // Convert to milliseconds

        setTimeout(() => {
          let currentSibling = summary.nextElementSibling
          while (currentSibling) {
            currentSibling.style.maxHeight = null // Remove inline max-height
            currentSibling = currentSibling.nextElementSibling
          }
        }, transitionDuration)
      }
    } else {
      // Apply max-heights and remove animation class
      let sibling = summary.nextElementSibling
      while (sibling) {
        sibling.style.maxHeight = `${sibling.scrollHeight}px`
        sibling = sibling.nextElementSibling
      }
    }
  }

  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
}
export { FAQSmoothHeightTransition }
