class SiteEditHotkey {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "e") {
        const editButton = document.querySelector("#wp-admin-bar-edit > a");
        if (editButton) editButton.click();
      }
    });
  }
}

export { SiteEditHotkey };
