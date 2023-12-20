import '../css/style.scss'
import { PersonnelPopup } from './modules/PersonnelPopup'

// import { SinglePopup } from './modules/SinglePopup'
// import { ConstructPopup } from './modules/ConstructPopup'
// import { AwardsVideoLoader } from './modules/AwardsVideoLoader'

// import { MobileAccordionSections } from './modules/MobileAccordionSections'
// import { MobileMenu } from './modules/MobileMenu'

const onReady = () => {
  if (location.hostname === 'localhost' || location.hostname.includes('ohja-update.local')) {
    document.body.classList.add('localhost')
  }
  var personnelPopup = new PersonnelPopup([
    {
      popupSelector: '.personnelcard--wrapper',
      targetAttribute: 'data-popup',
      activeClass: 'active',
      removeClass: 'fadeout',
      closeButtonClass: 'personnelpopup--closex'
    }
  ])
  // var constructPopup = new ConstructPopup([{ triggerSelector: '.youtube-popup' }])
  // var awardsVideoLoader = new AwardsVideoLoader([{ targetSelector: '#videoContainer' }])
}
if (document.readyState !== 'loading') {
  onReady()
} else {
  document.addEventListener('DOMContentLoaded', onReady)
}
