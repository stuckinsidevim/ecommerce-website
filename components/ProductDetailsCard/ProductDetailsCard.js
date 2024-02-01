import productDetailsCardHTML from "./ProductDetailsCard.html?raw";

export default class ProductDetailsCardComponent extends HTMLElement {
  static tagName = "product-details-card-component";

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = productDetailsCardHTML;
    shadowRoot.append(template.content.cloneNode(true));
  }

  connectedCallback() {
    const productCompany = this.getAttribute("product-company") ?? "";
    const productName = this.getAttribute("product-name") ?? "";
    const productPrice = +(this.getAttribute("product-price") ?? "");
    const productDescriptionDetails =
      this.getAttribute("product-description-details") ?? "";
    const productDescriptionList = JSON.parse(
      this.getAttribute("product-description-list") ?? [],
    );

    this.shadowRoot.querySelector(".company-name").textContent = productCompany;
    this.shadowRoot.querySelector("h1").textContent = productName;
    this.shadowRoot.querySelector("p.about-product").textContent =
      productDescriptionDetails;
    this.shadowRoot.querySelector("p.price").textContent = productPrice
      .toLocaleString("en-US", { minimumFractionDigits: 2 });

    const liItems = productDescriptionList.reduce(
      (acc, list) => `${acc} <li>${list}</li>`,
      "",
    );
    this.shadowRoot.querySelector(".about-product-points").innerHTML = liItems;
  }
}
