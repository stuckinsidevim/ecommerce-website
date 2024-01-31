import signUpFormHTML from "./SignUpForm.html?raw";

export default class SignUpFormComponent extends HTMLElement {
  static tagName = "sign-up-form-component";
  constructor() {
    super();
    this.innerHTML = signUpFormHTML;
    this.form = this.querySelector("#signupForm");
    this.form.onsubmit = null;
    this.submitButton = this.form.querySelector('button[type="submit"]');
  }

  connectedCallback() {
    this.form.addEventListener("submit", (event) => this.handleSubmit(event));
    this.form.addEventListener("input", () => this.toggleButtonState());
    this.toggleButtonState(); // Initial check
  }

  toggleButtonState(

  ) {
    // Check if all fields are valid and terms checkbox is checked
    const allValid = [...this.form.elements].every((element) => {
      return (element.type !== "checkbox" && element.validity.valid) ||
        (element.type === "checkbox" && element.checked);
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
      window.services.userService.signup(
        userDetails.email,
        userDetails.password,
      );
      console.log(userDetails, ` registered`);
    }
  }
}

// customElements.define(
//   SignUpFormComponent.tagName,
//   SignUpFormComponent,
// );
