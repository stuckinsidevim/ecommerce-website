import signInPageHTML from "./SignInPage.html?raw";

export default class SignInPageComponent extends HTMLElement {
  static tagName = "sign-in-page-component";
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("connected");
    this.innerHTML = signInPageHTML;
  }
}

// customElements.define(
//   SignInPageComponent.tagName,
//   SignInPageComponent,
// );
