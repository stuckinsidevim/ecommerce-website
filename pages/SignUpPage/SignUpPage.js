import signUpPageHTML from "./SignUpPage.html?raw";

export default class SignUpPageComponent extends HTMLElement {
  static tagName = "sign-up-page-component";
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("connected");
    this.innerHTML = signUpPageHTML;
  }
}

// customElements.define(
//   SignUpPageComponent.tagName,
//   SignUpPageComponent,
// );
