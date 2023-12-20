class AwardsVideoLoader {
  constructor(params) {
    this.events(params)
  }

  events(params) {
    const paramsArray = [].concat(params)
    paramsArray.forEach(p => this.initVideoLoader(p))
  }

  initVideoLoader({ targetSelector }) {
    console.log('initVideoLoader')
    const themeRoot = window.tdUri
    const today = new Date().toDateString()
    const playedToday = localStorage.getItem('videoPlayed') === today

    function loadVideo() {
      var vc = document.querySelector(targetSelector)
      if (!vc) return
      this.setupDeleteKeyHandler()
      if (playedToday) return
      this.applyStyles(vc)

      var isPortrait = window.innerHeight > window.innerWidth
      var videoSrc = isPortrait ? '/assets/video/Constellation_Mobile.mp4' : '/assets/video/Constellation_Desktop.mp4'
      var videoHTML = `<video autoplay="" muted="" playsinline="" src="${themeRoot}${videoSrc}" style="width:100%;height:100%;object-fit:cover;"></video>`

      vc.innerHTML = videoHTML
      var videoElement = vc.querySelector('video')
      videoElement.onended = () => this.fadeOutAndRemove(vc)
    }

    if (document.readyState !== 'loading') {
      loadVideo.bind(this)()
    } else {
      document.addEventListener('DOMContentLoaded', loadVideo.bind(this))
    }
    window.addEventListener('resize', loadVideo.bind(this))
  }

  applyStyles(vc) {
    var vcs = vc.style
    vcs.width = '100vw'
    vcs.height = '100vh'
    vcs.top = '0'
    vcs.left = '0'
    vcs.backgroundColor = 'black'
    vcs.position = 'fixed'
    vcs.zIndex = '1000000'
    vcs.overflow = 'hidden'
    vcs.display = 'flex'
    vcs.alignItems = 'center'
    vcs.justifyContent = 'center'
  }

  fadeOutAndRemove(element) {
    console.log('fadeOutAndRemove')

    // Apply CSS transition and initiate fade out
    element.style.transition = 'opacity 1s ease-out'
    element.style.opacity = '0'

    // Use setTimeout to wait for the transition to complete
    setTimeout(() => {
      element.remove()
      localStorage.setItem('videoPlayed', new Date().toDateString())
    }, 1000) // Wait for 1 second (1000 milliseconds)
  }

  setupDeleteKeyHandler() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Delete') {
        localStorage.removeItem('videoPlayed')
        console.log('LocalStorage cleared for video')
      }
    })
  }
}

export { AwardsVideoLoader }
