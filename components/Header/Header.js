import headerComponentHTML from "./Header.html?raw";

export default class HeaderComponent extends HTMLElement {
  static tagName = "header-component";
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = headerComponentHTML;
  }
}

// customElements.define(HeaderComponent.tagName, HeaderComponent);
