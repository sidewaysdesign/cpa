class InsertFooterPaddingElement {
  constructor() {
    this.debouncedResize = this.debounce(this.setFooterPadding.bind(this), 250)
    this.init()
  }

  init() {
    if (document.querySelector('main + footer')) {
      this.setFooterPadding()
      window.addEventListener('resize', this.debouncedResize)
    }
  }

  setFooterPadding() {
    const footer = document.querySelector('main + footer')
    const mainLastChild = document.querySelector('main > .entry-content > :last-child')
    const footerStyle = window.getComputedStyle(footer)
    const footerMargin = parseFloat(footerStyle.marginBottom)
    const footerBorderRadius = parseFloat(footerStyle.borderTopLeftRadius)

    let dummyDiv = mainLastChild.querySelector('#dummyDiv')
    if (!dummyDiv) {
      dummyDiv = document.createElement('div')
      dummyDiv.id = 'dummyDiv'
      mainLastChild.appendChild(dummyDiv)
    }

    dummyDiv.style.height = `${Math.abs(footerMargin) + footerBorderRadius}px`
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

export { InsertFooterPaddingElement }
