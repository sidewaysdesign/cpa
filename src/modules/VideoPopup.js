class VideoPopup {
  constructor(params) {
    this.events(params)
  }
  events(params) {
    const paramsArray = [].concat(params)
    paramsArray.forEach(p => this.popupInit(p))
  }
  popupInit({ triggerSelector, targetSelector, videoContainerSelector, appearClass = 'fadein', activeClass = 'active', removeClass = 'fadeout', closeButtonClass = 'closex', wrapperClass = 'singlepopup--wrapper', containerClass = 'singlepopup--container', delay = 750, createCloseButton = false, maxWidth = null, autoFire = false }) {
    const clonePanel = panel => {
      const newPanel = panel.cloneNode(true)
      newPanel.classList.add('singlepopup--showing')
      const popupWrapper = document.createElement('div')
      popupWrapper.classList.add(wrapperClass)
      const popupContainer = document.createElement('div')
      popupContainer.classList.add(containerClass)
      if (maxWidth) popupContainer.style.maxWidth = maxWidth
      popupWrapper.appendChild(popupContainer)
      popupContainer.appendChild(newPanel)
      const videoContainer = popupContainer.querySelector(videoContainerSelector)
      const videoUrl = videoContainer.getAttribute('data-video')
      // const videoHTML = composeVideoPlayer(videoUrl)
      videoContainer.appendChild(composeVideoPlayer(videoUrl))
      if (!videoContainer) return
      if (createCloseButton) {
        const newClosebutton = createCloseButtonElement(closeButtonClass)
        videoContainer.appendChild(newClosebutton)
      }
      document.body.appendChild(popupWrapper)
      appearPanel(popupWrapper, newPanel)
    }

    const composeVideoPlayer = (url, socialmessage) => {
      const videoElement = document.createElement('div')
      const videoHTML = `<iframe class="youtube-popup" width="100%" height="auto" src="${url}?autoplay=1&fs=0&modestbranding=1&showinfo=0&color=white&controls=2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"></iframe>`
      const socialButtons = `
      <div class="socialsharing--wrapper">
      <ul class="socialsharing--container">
      <li class="socialsharing--link-facebook"><a class="socialsharing--facebook-event" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&amp;title=${encodeURIComponent('IPEX Video')}" aria-label="FaceBook sharing button" rel="noopener nofollow" target="_blank">&nbsp;</a></li>
      <li class="socialsharing--link-linkedin"><a class="socialsharing--linkedin-event" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=${encodeURIComponent(url)}&amp;$title=${encodeURIComponent('IPEX Video')}" aria-label="LinkedIn sharing button" rel="noopener nofollow" target="_blank" class="wp-block-outermost-social-sharing-link-anchor">&nbsp;</a></li>
      <li class="socialsharing--link-email"><a class="socialsharing--email-event" href="mailto:?subject=&amp;subject=${encodeURIComponent('IPEX Video')}&amp;body=${encodeURIComponent(url)}" aria-label="Mail share label">&nbsp;</a></li>
      </ul>
      </div>`
      videoElement.innerHTML = videoHTML + socialButtons
      return videoElement
    }

    const createCloseButtonElement = buttonClass => {
      const closeButton = document.createElement('div')
      closeButton.classList.add(buttonClass)
      closeButton.setAttribute('aria-label', 'Close')
      return closeButton
    }
    const appearPanel = (panel, newPanel) => {
      const scrollPosition = `-${window.scrollY}px`
      document.body.style.position = 'fixed'
      document.body.style.top = scrollPosition
      newPanel.style.removeProperty('display')
      const closex = panel.querySelector(`.${closeButtonClass}`)
      const closeBg = initCloseBg()
      panel.prepend(closeBg)
      closeBg.addEventListener('click', e => {
        removePanel(panel, scrollPosition)
      })
      if (closex) closex.addEventListener('click', e => removePanel(panel))
      window.addEventListener('keydown', handleKeypress(panel), false)
      setTimeout(() => {
        panel.classList.add(activeClass)
      }, 1)
    }
    const initCloseBg = () => {
      const co = document.createElement('div')
      co.style.cssText = 'background-color:transparent; position:absolute; top:0; left:0; width:100%; height:100%;'
      return co
    }
    const removePanel = (panel, scrollPosition) => {
      const transferScrollPos = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(document.body.style.left, parseInt(transferScrollPos) * -1)

      panel.classList.remove(activeClass)
      setTimeout(() => panel.remove(), delay)
      window.removeEventListener('keypress', handleKeypress)
    }
    function handleKeypress(panel) {
      return function (e) {
        if (e.key === 'Escape') removePanel(panel)
      }
    }
    const freezeInPlace = el => {
      const { top, left, width, height } = el.getBoundingClientRect()
      el.style.top = `${top}px`
      el.style.left = `${left}px`
      el.style.width = `${width}px`
      el.style.height = `${height}px`
      el.style.position = 'fixed'
    }

    if (autoFire) {
      const soloTarget = document.querySelector(targetSelector)
      clonePanel(soloTarget)
      return
    }

    const popupTriggers = document.querySelectorAll(triggerSelector)
    if (!popupTriggers) return
    popupTriggers.forEach(trigger => {
      const target = document.querySelector(targetSelector)
      trigger.style.cursor = 'pointer'
      trigger.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        clonePanel(target)
      })
    })
  }
}

export { VideoPopup }
