// .wp-block-details.is-style-popup-menu

class AddAriaHidden {
  constructor(params) {
    this.events(params)
  }

  events(params) {
    const paramsArray = [].concat(params)
    paramsArray.forEach(p => this.initModule(p))
  }

  initModule({ targetSelector }) {
    const targetElements = document.querySelectorAll(targetSelector)
    targetElements.forEach(target => {
      target.setAttribute('aria-hidden', 'true')
    })
  }
}

export { AddAriaHidden }
