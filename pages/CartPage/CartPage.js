import cartPageHTML from "./CartPage.html?raw";

export default class CartPageComponent extends HTMLElement {
  static tagName = "cart-page-component";
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("connected");
    this.innerHTML = cartPageHTML;
  }
}
