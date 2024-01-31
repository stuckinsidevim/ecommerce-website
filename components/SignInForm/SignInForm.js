import signInFormHTML from "./SignInForm.html?raw";

export default class SignInFormComponent extends HTMLElement {
  static tagName = "sign-in-form-component";
  constructor() {
    super();
    this.innerHTML = signInFormHTML;
    this.form = this.querySelector("#signinForm");
    this.form.onsubmit = null;
    this.submitButton = this.form.querySelector('button[type="submit"]');
  }

  connectedCallback() {
    this.form.addEventListener("submit", (event) => this.handleSubmit(event));
    this.form.addEventListener("input", () => this.toggleButtonState());
    this.toggleButtonState();
  }
  toggleButtonState() {
    // Check if all fields are valid
    const allValid = [...this.form.elements].every((element) => {
      return element.nodeName === "BUTTON" || element.validity.valid;
    });
    this.submitButton.disabled = !allValid;
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(this.form);
    const userDetails = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // If an external onsubmit handler is defined, use it
    if (typeof this.onsubmit === "function") {
      this.onsubmit(userDetails);
    } else {
      const userService = window.services.userService;
      if (!userService.checkIfExists(userDetails.email)) {
        const msg = "user hasn't registerd";
        alert(msg);
        console.error(msg);
        return;
      }
      const user = userService.login(
        userDetails.email,
        userDetails.password,
      );
      if (user === undefined) {
        const msg = "Wrong password";
        alert(msg);
        console.error(msg);
        return;
      }
      console.log(userDetails, ` logged in`);
    }
  }
}

// customElements.define(
//   SignInFormComponent.tagName,
//   SignInFormComponent,
// );
