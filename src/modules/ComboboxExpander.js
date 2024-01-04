// .wp-block-details.is-style-popup-menu

class ComboboxExpander {
  constructor(params) {
    this.events(params)
  }

  events(params) {
    const paramsArray = [].concat(params)
    paramsArray.forEach(p => this.initModule(p))
  }

  createObserver(target, summaryElement) {
    return new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
          if (target.hasAttribute('open')) {
            target.style.maxHeight = `${summaryElement.offsetHeight}px`
            target.style.overflow = 'visible'
            summaryElement.setAttribute('aria-expanded', 'true') // Update aria-expanded when 'open' is present
          } else {
            target.style.maxHeight = ''
            target.style.overflow = ''
            summaryElement.setAttribute('aria-expanded', 'false') // Update aria-expanded when 'open' is not present
          }
        }
      })
    })
  }

  initModule({ targetSelector }) {
    const targetElements = document.querySelectorAll(targetSelector)

    targetElements.forEach(target => {
      const summaryElement = target.querySelector('summary')
      if (!summaryElement) return
      summaryElement.setAttribute('aria-haspopup', 'true')
      summaryElement.setAttribute('aria-controls', 'yourMenuId') // replace 'yourMenuId' with the actual ID of your menu
      summaryElement.setAttribute('aria-expanded', 'false')

      // Create a MutationObserver instance
      const observer = this.createObserver(target, summaryElement)

      // Start observing the target node for configured mutations
      observer.observe(target, { attributes: true })

      // Handle click outside the target element
      document.addEventListener('click', event => {
        if (!target.contains(event.target) && target.hasAttribute('open')) {
          target.removeAttribute('open')
        }
      })
      // Function to handle keydown events
      function handleKeydown(event) {
        if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
          if (target.hasAttribute('open')) {
            target.removeAttribute('open')
          }
        }
      }

      // Add keydown listener when the target receives focus
      target.addEventListener('focus', () => {
        target.addEventListener('keydown', handleKeydown)
      })

      // Remove keydown listener when the target loses focus
      target.addEventListener('blur', () => {
        target.removeEventListener('keydown', handleKeydown)
      })
    })
  }
}

export { ComboboxExpander }
