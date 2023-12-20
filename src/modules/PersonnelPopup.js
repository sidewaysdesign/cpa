class PersonnelPopup {
  constructor(params) {
    this.events(params)
  }
  events(params) {
    const paramsArray = [].concat(params)
    paramsArray.forEach(p => this.popupInit(p))
  }
  popupInit({ popupSelector = '', targetAttribute, appearClass = 'fadein', activeClass = 'active', removeClass = 'fadeout', closeButtonClass = 'closex', delay = 750 }) {
    const popupWrappers = document.querySelectorAll(popupSelector)
    if (!popupSelector || !popupWrappers.length) {
      return
    }
    popupWrappers.forEach(popupWrapper => {
      const triggers = popupWrapper.querySelectorAll(`[${targetAttribute}]`)
      triggers.forEach(trigger => {
        const targetId = trigger.getAttribute(targetAttribute)
        const origPopup = document.getElementById(targetId)
        if (origPopup) {
          trigger.addEventListener('click', e => {
            e.preventDefault()
            this.clonePanel(origPopup, activeClass, closeButtonClass, delay)
          })
        }
      })
    })
  }

  clonePanel(panel, activeClass, closeButtonClass, delay) {
    const newPanel = panel.cloneNode(true)
    document.body.appendChild(newPanel)
    this.appearPanel(newPanel, activeClass, closeButtonClass, delay)
  }

  appearPanel(panel, activeClass, closeButtonClass, delay) {
    panel.style.removeProperty('display')
    panel.setAttribute('aria-hidden', 'false') // panel is visible

    const closex = panel.querySelector(`.${closeButtonClass}`)
    const closeBg = this.initCloseBg()
    panel.prepend(closeBg)
    closeBg.addEventListener('click', e => this.removePanel(panel, activeClass, delay))
    closex.addEventListener('click', e => this.removePanel(panel, activeClass, delay))
    window.addEventListener('keydown', this.handleKeypress(panel, activeClass, delay), false)
    setTimeout(() => {
      panel.classList.add(activeClass)
    }, 1)
  }

  initCloseBg() {
    const co = document.createElement('div')
    co.style.cssText = 'background-color:transparent; position:absolute; top:0; left:0; width:100%; height:100%;'
    co.setAttribute('aria-hidden', 'true')
    co.setAttribute('tabindex', '-1')
    return co
  }

  removePanel(panel, activeClass, delay) {
    panel.classList.remove(activeClass)
    panel.setAttribute('aria-hidden', 'true') // panel is hidden

    setTimeout(() => panel.remove(), delay)
    window.removeEventListener('keydown', this.handleKeypress)
  }

  handleKeypress(panel, activeClass, delay) {
    return function (e) {
      if (e.key === 'Escape') this.removePanel(panel, activeClass, delay)
    }.bind(this)
  }
}

export { PersonnelPopup }
