import productDetailsPageHTML from "./ProductDetailsPage.html?raw";

export default class ProductDetailsPageComponent extends HTMLElement {
  static tagName = "product-details-page-component";
  constructor(params) {
    super();
    this.productId = +params.data.at(0);
  }

  async connectedCallback() {
    console.log("connected");
    console.log(window.services);
    const carousel = this.querySelector("my-carousel");
    // --- THIS CAN BECOME A ROUTE HOOK ---
    const product = await window.services.productService.getProduct(
      this.productId,
    );
    if (product === undefined) {
      const msg =
        `product :: ${this.productId} doesn't exist. Redirecting to /products`;
      console.warn(msg);
      window.router.navigate("products");
      return;
    }
    // ---------------------------------------
    this.innerHTML = productDetailsPageHTML;
    const urls = product.url;
    urls.forEach((url, i) => {
      const imageSlideHTML = `
<div id="slide-${i}">
  <img src="${url}" />
</div>`;
      carousel.insertAdjacentHTML("beforeend", imageSlideHTML);
    });
  }
}
