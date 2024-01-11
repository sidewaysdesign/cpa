class AdjustContentHeight {
  constructor(params) {
    // this.debouncedResize = this.debounce(this.AdjustContentHeight.bind(this), 100)
    this.slideParentClassName = 'wp-block-gutsliders-slide'
    this.uniqueId = 'unique-id-' + Math.random().toString(36).substring(2, 15)
    this.events(params)
  }

  events(params) {
    const paramsArray = [].concat(params)
    paramsArray.forEach(p => this.initModule(p))
  }

  initModule({ targetSelector }) {
    console.log('initModule')
    this.targetElements = document.querySelectorAll(targetSelector)
    this.targetElements.forEach(target => {
      // Function to check if the children are loaded and call AdjustContentHeight
      const checkChildrenAndAdjustHeight = (attempts = 0) => {
        if (target.children.length > 0) {
          // If the children are loaded, call AdjustContentHeight
          this.AdjustContentHeight(target, targetSelector)
        } else if (attempts < 10) {
          // Replace 10 with your desired maximum number of attempts
          // If the children are not loaded and the maximum number of attempts has not been reached,
          // set a timeout to check again after 500 milliseconds
          setTimeout(() => checkChildrenAndAdjustHeight(attempts + 1), 500)
        }
      }

      // Call the function initially
      checkChildrenAndAdjustHeight()

      // Add a debounced resize event listener
      window.addEventListener(
        'resize',
        this.debounce(() => {
          this.AdjustContentHeight(target, targetSelector)
        }, 100)
      )
    })
  }
  AdjustContentHeight(target, targetSelector) {
    console.log('AdjustContentHeight')
    const children = Array.from(target.children)
    const heights = children.map(child => this.getNaturalHeight(child))
    const maxHeight = Math.max(...heights)

    // Find the closest ancestor with the class '.wp-block-gutsliders-slide'
    const ancestor2 = target.closest(`.${this.slideParentClassName}`)

    // Find the root ancestor with the attribute 'data-swiper-options'
    const rootParent = target.closest('[data-swiper-options]')

    // target's parent
    const parent = target.parentNode

    if (rootParent && ancestor2 && parent) {
      // Get the padding of the ancestor elements
      const ancestor2Style = window.getComputedStyle(ancestor2)
      const ancestor2PaddingTop = parseFloat(ancestor2Style.paddingTop)
      const ancestor2PaddingBottom = parseFloat(ancestor2Style.paddingBottom)

      // Get the padding of the parent element
      const parentStyle = window.getComputedStyle(parent)
      const parentPaddingTop = parseFloat(parentStyle.paddingTop)
      const parentPaddingBottom = parseFloat(parentStyle.paddingBottom)

      // Add a unique id to the ancestor elements and parent
      rootParent.id = this.uniqueId
      ancestor2.id = `${this.uniqueId}-2`
      parent.id = `${this.uniqueId}-parent`

      // Check if a style element for the ancestor elements and parent already exists
      let style = document.querySelector(`style[data-for="${this.uniqueId}"]`)

      // If the style element exists, remove it
      if (style) {
        style.remove()
      }

      // Create a new style element and append it to the document head
      style = document.createElement('style')
      style.setAttribute('data-for', `${this.uniqueId}`)
      document.head.appendChild(style)

      // Set the content of the style element
      style.textContent = `
      #${this.uniqueId} .wp-block-gutsliders-slide {
        height: ${maxHeight + ancestor2PaddingTop + ancestor2PaddingBottom}px !important;
      }
      #${this.uniqueId} ${targetSelector} {
        height: ${maxHeight + parentPaddingTop + parentPaddingBottom}px !important;
      }
    `
    }
  }

  getNaturalHeight(target) {
    // Clone the target element and position it offscreen
    const clone = target.cloneNode(true)
    clone.style.position = 'absolute'
    clone.style.left = '-9999px'
    clone.style.width = `${target.offsetWidth}px` // Preserve the width
    document.body.appendChild(clone)

    // Get the natural height of the cloned element
    const contentHeight = clone.scrollHeight

    // Remove the cloned element
    document.body.removeChild(clone)

    return contentHeight
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
export { AdjustContentHeight }
