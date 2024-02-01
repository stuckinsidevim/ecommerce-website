import productDetailsPageHTML from "./ProductDetailsPage.html?raw";

export default class ProductDetailsPageComponent extends HTMLElement {
  static tagName = "product-details-page-component";
  constructor(params) {
    super();
    this.productId = +params.data.at(0);
    this.innerHTML = productDetailsPageHTML;
  }

  async connectedCallback() {
    console.log("connected");
    // --- THIS CAN BECOME A ROUTE HOOK ---
    const product = await window.services.productService.getProduct(
      this.productId,
    );
    console.log(product);
    if (product === undefined) {
      const msg =
        `product :: ${this.productId} doesn't exist. Redirecting to /products`;
      console.warn(msg);
      window.router.navigate("products");
      return;
    }
    // ---------------------------------------
    const carousel = this.querySelector("my-carousel");
    const urls = product.urls;
    urls.forEach((url, i) => {
      const imageSlideHTML = `
<div id="slide-${i}">
  <img src="${url}" />
</div>`;
      carousel.insertAdjacentHTML("beforeend", imageSlideHTML);
    });

    const el = document.querySelector("#product-details");
    const card = document.createElement("product-details-card-component");
    card.setAttribute("product-company", product.company);
    card.setAttribute("product-name", product.name);
    card.setAttribute("product-price", product.price);
    card.setAttribute(
      "product-description-details",
      product.description.details,
    );
    card.setAttribute(
      "product-description-list",
      JSON.stringify(product.description.list),
    );
    el.appendChild(card);

    const length = carousel.children.length;
    //Navigate
    document.querySelector(".carousel-next").addEventListener(
      "click",
      (event) => {
        carousel.index += 1;
        if (carousel.index == length - 1) {
          carousel.index = 0;
          return;
        }
        console.log("Carousel index :: ", carousel.index);
      },
    );
    document.querySelector(".carousel-prev").addEventListener(
      "click",
      (event) => {
        carousel.index -= 1;
        if (carousel.index == 0) {
          carousel.index = length - 1;
          return;
        }
        console.log("Carousel index :: ", carousel.index);
      },
    );
  }
}
