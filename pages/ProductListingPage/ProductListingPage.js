import productListingPageHTML from "./ProductListingPage.html?raw";

export default class ProductListingPageComponent extends HTMLElement {
  static tagName = "product-listing-page-component";
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("connected");
    this.innerHTML = productListingPageHTML;
  }
}

// customElements.define(
//   ProductListingPageComponent.tagName,
//   ProductListingPageComponent,
// );
