import productListComponentHTML from "./ProductList.html?raw";

export default class ProductListComponent extends HTMLElement {
  static tagName = "product-list-component";
  pageSize = 2; // Default page size
  products = [];

  constructor() {
    super();
    this.innerHTML = productListComponentHTML;

    this.paginationWidget = document.querySelector("pagination-widget");
    this.paginationWidget.setAttribute("page-size", this.pageSize.toString());
    this.paginationWidget.addEventListener(
      "page-selected",
      this.handlePageSelected.bind(this),
    );
  }

  connectedCallback() {
    this.fetchProducts();
  }

  fetchProducts() {
    window.services.productService.getProducts().then(
      (products) => {
        this.products = products;
        this.paginationWidget.setAttribute(
          "total-items",
          products.length.toString(),
        );
        this.displayPage(1); // Display the first page initially
      },
    ).catch((err) => console.error(err));
  }
  displayPage(pageNumber) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.products.length);
    const productsToShow = this.products.slice(startIndex, endIndex);

    const parent = this.querySelector(".main__product-list");
    parent.innerHTML = ""; // Clear the current products
    productsToShow.forEach((product) => {
      const childHTML = `<product-card-component image-url="${
        product.urls[0]
      }" product-name="${product.name}" product-company="${product.company}" product-price="${product.price}" product-id="${product.id}"></product-card-component>`;
      parent.insertAdjacentHTML("beforeend", childHTML);
    });
  }

  handlePageSelected(event) {
    const selectedPage = event.detail.pageNumber;
    this.displayPage(selectedPage);
  }
}

// customElements.define(ProductListComponent.tagName, ProductListComponent);
