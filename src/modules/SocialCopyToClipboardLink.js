// Define the language strings
import ClipboardJS from 'clipboard'

class SocialCopyToClipboardLink {
  constructor(params) {
    this.languageStrings = {
      en: {
        copyPostLink: 'Copy post link to clipboard'
      },
      fr: {
        copyPostLink: 'Copier le lien du post dans le presse-papiers'
      }
    }
    this.events(params)
  }

  events(params) {
    const paramsArray = [].concat(params)
    paramsArray.forEach(p => this.initModule(p))
  }

  initModule({ targetSelector }) {
    const targetElements = document.querySelectorAll(targetSelector)

    targetElements.forEach(target => {
      const listItem = document.createElement('li')
      const currentLanguage = document.documentElement.lang && document.documentElement.lang.includes('fr') ? 'fr' : 'en'

      const link = this.createLink(currentLanguage)

      listItem.appendChild(link)
      target.appendChild(listItem)

      let siblingClassList = listItem.previousElementSibling ? listItem.previousElementSibling.classList : null

      if (!siblingClassList || siblingClassList.length === 0) {
        listItem.classList.add('wp-social-link', 'wp-social-link-x', 'has-accent-5-color', 'wp-block-social-link')
      } else {
        // Add the classes of the sibling to the list item
        listItem.classList.add(...siblingClassList)
      }
    })
    this.createLiveRegion()
  }

  createLink(currentLanguage) {
    const link = document.createElement('a')
    link.classList.add('wp-block-social-link-anchor')
    link.innerHTML = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490" aria-hidden="true" focusable="false"><path d="M267.7085,369.5616c-19.313,18.3877-44.9736,28.6184-71.64,28.5625-.4424,0-.8818-.0024-1.3242-.0078-57.5277-.7192-103.5801-47.9377-102.8609-105.4655.3277-26.2104,10.5246-51.334,28.5566-70.3587,7.6012-8.0143,20.2601-8.3492,28.2745-.748,8.0143,7.6012,8.3492,20.2601.748,28.2745-24.4588,25.6449-23.4972,66.2619,2.1477,90.7207,24.7906,23.644,63.7824,23.644,88.573,0,7.9705-7.6471,20.6311-7.385,28.2782.5855,7.6472,7.9705,7.385,20.6311-.5855,28.2782-.0555.0532-.1113.1061-.1673.1587h0ZM282.7153,235.5665l-47.1436,47.1435c-7.8105,7.8107-20.4739,7.8109-28.2847.0004-7.8107-7.8105-7.8109-20.4739-.0004-28.2846l47.1434-47.1435c7.8105-7.8107,20.4739-7.811,28.2847-.0005,7.8107,7.8105,7.8109,20.474.0005,28.2847h.0001ZM367.6215,269.6965l-11.2167,11.2173c-7.8406,7.7803-20.5038,7.7314-28.2841-.1092-7.7375-7.7975-7.7379-20.3762-.0007-28.1741l11.2178-11.2183c25.031-25.0877,24.985-65.717-.1027-90.748-25.0472-24.9906-65.5967-24.991-90.6444-.0009l-11.22,11.2188c-7.828,7.793-20.4912,7.7646-28.2842-.0633-7.7687-7.8036-7.7683-20.4189.001-28.2219l11.2187-11.2183c40.7152-40.6455,106.6711-40.5891,147.3166.1261,40.5969,40.6664,40.5963,106.5262-.0013,147.1918h0Z"/></svg>`
    link.setAttribute('href', '#')
    link.setAttribute('class', 'copytoclipboard__social')

    const copyPostLink = this.languageStrings[currentLanguage] ? this.languageStrings[currentLanguage].copyPostLink : this.languageStrings['en'].copyPostLink
    link.setAttribute('aria-label', copyPostLink)
    link.setAttribute('title', copyPostLink)
    const clickHandler = function (event) {
      event.preventDefault()
      event.stopPropagation()
      // Copy the link to the clipboard
    }
    const clipboard = new ClipboardJS(link, {
      text: function (trigger) {
        // Use the permalink from PHP if available, otherwise use the current URL
        return window.permalink ? window.permalink : window.location.href
      }
    })

    clipboard.on('success', function (e) {
      console.log('Link copied to clipboard')
      e.clearSelection()

      // Update an aria-live region
      const liveRegion = document.querySelector('#live-region')
      if (liveRegion) {
        liveRegion.textContent = 'Link copied to clipboard!'
        // Clear the live region after 5 seconds
        setTimeout(() => {
          liveRegion.textContent = ''
        }, 5000)
      }
    })

    clipboard.on('error', function (e) {
      console.error('Error copying link to clipboard')
    })
    link.removeEventListener('click', clickHandler)
    link.addEventListener('click', clickHandler)

    return link
  }

  createLiveRegion() {
    const liveRegion = document.createElement('div')
    liveRegion.id = 'live-region'
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.style.cssText = `
    position: absolute;
    width: 1px;
    height: 1px;
    margin-top: -1px;
    margin-left: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  `
    document.body.appendChild(liveRegion)
  }
  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Copying to clipboard was successful!')
        // Update an aria-live region
        const liveRegion = document.querySelector('#live-region')
        if (liveRegion) {
          liveRegion.textContent = 'Link copied to clipboard!'
          // Clear the live region after 5 seconds
          setTimeout(() => {
            liveRegion.textContent = ''
          }, 5000)
        }
      },
      err => {
        console.error('Could not copy text: ', err)
      }
    )
  }
}

export { SocialCopyToClipboardLink }
