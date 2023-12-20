import { VideoPopup } from './VideoPopup'

class ConstructPopup {
  constructor(params) {
    this.events(params)
  }
  events(params) {
    const paramsArray = [].concat(params)
    paramsArray.forEach(p => this.popupBaseInit(p))
  }
  popupBaseInit({ triggerSelector }) {
    const trigger = document.querySelectorAll(triggerSelector)
    if (!trigger) return
    trigger.forEach(t => {
      let videoUrl
      const randStringId =
        'buttonvideo-' +
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, '')
          .substr(0, 90)
      videoUrl = t.getAttribute('href')
      if (!videoUrl) {
        const videoUrlEl = t.querySelector('[href]')
        videoUrl = videoUrlEl.getAttribute('href')
        if (!videoUrl) return
      }
      const popupTemplate = document.createElement('div')
      popupTemplate.classList.add('hiddenuntil-popup')
      popupTemplate.innerHTML = `
   <div class="single-video-popup--unit" id="${randStringId}">
   <div class="single-video-popup--wrapper">
   <div class="single-video-popup--container" data-video="${videoUrl}">
   </div>
   </div>
   </div>`
      document.body.appendChild(popupTemplate)
      t.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        const newPopup = new VideoPopup([
          {
            videoContainerSelector: '.single-video-popup--container',
            triggerSelector: `[data-video="${videoUrl}"]`,
            targetSelector: `#${randStringId}`,
            activeClass: 'active',
            removeClass: 'fadeout',
            closeButtonClass: 'singlepopup--closex',
            createCloseButton: true,
            autoFire: true
          }
        ])
      })
    })
  }
}

export { ConstructPopup }
