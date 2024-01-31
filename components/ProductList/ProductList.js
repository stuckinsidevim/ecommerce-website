import productListComponentHTML from "./ProductList.html?raw";

export default class ProductListComponent extends HTMLElement {
  static tagName = "product-list-component";
  constructor() {
    super();
    this.innerHTML = productListComponentHTML;
  }

  connectedCallback() {
    fetch("../../data.json").then((response) => response.json()).then(
      (products) => {
        console.log(products);
        const parent = document.querySelector(".main__product-list");
        products.forEach((product) => {
          const childHTML = `<product-card-component image-url="${
            product.url[0]
          }" product-name="${product.name}" product-company="${product.company}" product-price="${product.price}" product-id="${product.id}"></product-card-component>`;
          parent.insertAdjacentHTML("beforeend", childHTML);
        });
      },
    ).catch((err) => console.error(err));
  }
}

// customElements.define(ProductListComponent.tagName, ProductListComponent);
