import productCardHTML from "./ProductCard.html?raw";

export default class ProductCardComponent extends HTMLElement {
  static tagName = "product-card-component";

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = productCardHTML;
    shadowRoot.append(template.content.cloneNode(true));
  }

  connectedCallback() {
    const imageUrl = this.getAttribute("image-url") ?? "";
    const productName = this.getAttribute("product-name") ?? "";
    const productCompany = this.getAttribute("product-company") ?? "";
    // TODO: convert the price 10000 -> 10,000.0
    const productPrice = +(this.getAttribute("product-price") ?? "");
    const productId = this.getAttribute("product-id") ?? "";

    this.shadowRoot.querySelector(".product__image").src = imageUrl;
    this.shadowRoot.querySelector(".product__image").alt = productName;
    this.shadowRoot.querySelector(".product__name").textContent = productName;
    this.shadowRoot.querySelector(".product__company").textContent =
      productCompany;
    this.shadowRoot.querySelector(".product__price").textContent = productPrice
      .toLocaleString("en-US", { minimumFractionDigits: 2 });

    this.shadowRoot.addEventListener("click", (e) => {
      console.log(window);
      window.router.navigate(`/products/${productId}`);
    });
  }
}
