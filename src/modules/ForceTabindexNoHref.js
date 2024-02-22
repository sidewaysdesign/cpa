export class ForceTabindexNoHref {
  constructor() {
    this.events();
  }
  events() {
    const links = document.querySelectorAll("header a.wp-block-navigation-item__content:not([href])");
    links.forEach((link) => {
      link.setAttribute("tabindex", "0");
    });
  }
}
