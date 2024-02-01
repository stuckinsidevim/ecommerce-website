import productListComponentHTML from "./ProductList.html?raw";

export default class ProductListComponent extends HTMLElement {
  static tagName = "product-list-component";
  pageSize = 2; // Default page size
  products = [];
  filteredProducts = [];
  currentFilters = {};

  constructor() {
    super();
    this.innerHTML = productListComponentHTML;

    this.paginationWidget = this.querySelector("pagination-widget");
    this.paginationWidget.setAttribute("page-size", this.pageSize.toString());
    this.paginationWidget.addEventListener(
      "page-selected",
      this.handlePageSelected.bind(this),
    );
    document.addEventListener("search-initiated", this.handleSearch.bind(this));
    document.addEventListener(
      "filter-changed",
      this.handleFilterChange.bind(this),
    );
  }

  connectedCallback() {
    this.fetchProducts().then(() => {
      const filterElement = document.querySelector("filter-widget");
      console.log("Categories in on render", [
        ...new Set(this.products.map((p) => p.category)),
      ]);
      filterElement.filterData = [
        {
          type: "category",
          label: "Category",
          options: [...new Set(this.products.map((p) => p.category))],
        },
        // {
        //   type: "price",
        //   label: "Price",
        //   options: ["Under $50", "$50 to $100", "Over $100"],
        // },
        // More filters can be added here
      ];
    });
  }

  async fetchProducts() {
    const products = await window.services.productService.getProducts();
    this.products = products;
    this.filteredProducts = [...products]; // Initialize with all products
    this.paginationWidget.setAttribute(
      "total-items",
      products.length.toString(),
    );
    this.displayPage(1);
  }

  displayPage(pageNumber) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

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

  handleSearch(event) {
    const searchTerm = event.detail.searchTerm.toLowerCase();
    // If there's a search term, set it in the filters; if not, remove the search filter.
    if (searchTerm) {
      this.currentFilters["search"] = searchTerm;
    } else {
      delete this.currentFilters["search"];
    }
    this.applyFilters();
  }

  handleFilterChange(event) {
    const { filterType, value } = event.detail;
    // Set or clear the filter based on the value
    if (value) {
      this.currentFilters[filterType] = value;
    } else {
      delete this.currentFilters[filterType];
    }
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter((product) => {
      return Object.entries(this.currentFilters).every(
        ([filterType, filterValue]) => {
          switch (filterType) {
            case "category":
              return product.category.toLowerCase() ===
                filterValue.toLowerCase();
            case "price":
              // Implement price filtering logic
              return true; // Placeholder, implement actual logic
            case "search":
              // Apply search term across different fields
              return (
                product.name.toLowerCase().includes(filterValue) ||
                product.category.toLowerCase().includes(filterValue) ||
                product.company.toLowerCase().includes(filterValue) ||
                product.description.details.toLowerCase().includes(filterValue)
              );
            default:
              return true;
          }
        },
      );
    });

    this.paginationWidget.setAttribute(
      "total-items",
      this.filteredProducts.length.toString(),
    );
    this.displayPage(1);
  }
}
