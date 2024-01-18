class PlayPauseButton {
  constructor(params) {
    this.events(params);
  }

  events(params) {
    const paramsArray = [].concat(params);
    paramsArray.forEach((p) => {
      this.addPlayButtonInit(p);
      this.markVideoAsPresentation(p);
    });
  }

  getLanguage() {
    const lang = document.documentElement.lang || "en";
    const match = lang.match(/[a-z]{2}/i);
    return match ? match[0] : "en";
  }

  getLabels() {
    const languages = {
      en: {
        playButton: "Play",
        playPreview: "Play Preview",
        playPreviewAria: "Play Preview",
        playVideo: "Play Video",
        playVideoAria: "Play Video",
        pauseButton: "Pause",
        pausePreview: "Pause Preview",
        pausePreviewAria: "Pause Preview",
        pauseVideo: "Pause Video",
        pauseVideoAria: "Pause Video",
      },
      fr: {
        playButton: "Jouer",
        playPreview: "Lancer l’aperçu",
        playPreviewAria: "Lancer l’aperçu",
        playVideo: "Démarrer",
        playVideoAria: "Démarrer la vidéo",
        pauseButton: "Pause",
        pausePreview: "Pause",
        pausePreviewAria: "Pause de l’aperçu",
        pauseVideo: "Pause",
        pauseVideoAria: "Pause de la vidéo",
      },
    };

    return languages[this.getLanguage()];
  }
  addPlayButtonInit({ targetSelector, isPreview = false }) {
    const buttonContainer = targetSelector;
    const containers = document.querySelectorAll(buttonContainer);
    const {
      playButton,
      pauseButton,
      playPreview,
      pausePreview,
      playVideo,
      pauseVideo,
      playPreviewAria,
      playVideoAria,
      pausePreviewAria,
      pauseVideoAria,
    } = this.getLabels();

    const playAction = isPreview ? playPreview : playVideo;
    const playAriaAction = isPreview ? playPreviewAria : playVideoAria;
    const pauseAction = isPreview ? pausePreview : pauseVideo;
    const pauseAriaAction = isPreview ? pausePreviewAria : pauseVideoAria;
    if (!containers.length) return;

    containers.forEach((container) => {
      const videoPlayer = container.querySelector("video");
      if (videoPlayer) {
        const ppb = document.createElement("button");

        ppb.innerHTML = videoPlayer.paused ? playButton : pauseButton; // visible text
        ppb.setAttribute("aria-label", videoPlayer.paused ? playAriaAction : pauseAriaAction); // screen reader text
        ppb.classList.add("pause-preview");
        ppb.addEventListener("click", function () {
          if (videoPlayer.paused) {
            videoPlayer.play();
            ppb.innerHTML = pauseButton;
            ppb.classList.remove("paused").setAttribute("aria-label", pauseAriaAction);
          } else {
            videoPlayer.pause();
            ppb.innerHTML = playButton;
            ppb.classList.add("paused").setAttribute("aria-label", playAriaAction);
          }
        });

        container.appendChild(ppb);
      }
    });
  }
  markVideoAsPresentation({ targetSelector, ariaHidden = false }) {
    const containers = document.querySelectorAll(targetSelector);
    containers.forEach((container) => {
      const video = container.querySelector("video");
      if (video) {
        video.setAttribute("aria-hidden", ariaHidden);
      }
    });
  }
}

export { PlayPauseButton };
