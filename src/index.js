import '../css/style.scss'
import { PersonnelPopup } from './modules/PersonnelPopup'
import { ComboboxExpander } from './modules/ComboboxExpander'
import { SocialCopyToClipboardLink } from './modules/SocialCopyToClipboardLink'
import { AddAriaHidden } from './modules/AddAriaHidden'

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
  var comboboxExpander = new ComboboxExpander([{ targetSelector: '.wp-block-details.is-style-popup-menu' }])
  var socialCopyToClipboardLink = new SocialCopyToClipboardLink([{ targetSelector: '.wp-block-social-links' }])
  var addAriaHidden = new AddAriaHidden([{ targetSelector: '.is-style-aria-hidden' }])
  // var constructPopup = new ConstructPopup([{ triggerSelector: '.youtube-popup' }])
  // var awardsVideoLoader = new AwardsVideoLoader([{ targetSelector: '#videoContainer' }])
}
if (document.readyState !== 'loading') {
  onReady()
} else {
  document.addEventListener('DOMContentLoaded', onReady)
}
