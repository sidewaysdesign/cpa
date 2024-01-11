class HandleCurrentMenuItem {
  constructor() {
    this.initModule()
  }

  initModule() {
    this.clearCurrentMenuItems()
    const targetElements = document.querySelectorAll('a[href*="#"]')
    targetElements.forEach(target => {
      target.addEventListener('click', this.handleClick.bind(this))
    })
  }

  clearCurrentMenuItems() {
    const currentMenuItems = document.querySelectorAll('.wp-block-navigation__submenu-container .current-menu-item')
    currentMenuItems.forEach(item => {
      item.classList.remove('current-menu-item')
    })
  }

  handleClick(event) {
    const currentMenuItem = document.querySelector('.current-menu-item')
    if (currentMenuItem) {
      currentMenuItem.classList.remove('current-menu-item')
    }
    event.target.parentElement.classList.add('current-menu-item')
  }
}

export { HandleCurrentMenuItem }
