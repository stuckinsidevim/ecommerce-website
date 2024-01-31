import footerComponentHTML from "./Footer.html?raw";

export default class FooterComponent extends HTMLElement {
  static tagName = "footer-component";
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = footerComponentHTML;
  }
}

// customElements.define(FooterComponent.tagName, FooterComponent);
