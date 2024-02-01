const searchWidgetTemplate = document.createElement("template");
searchWidgetTemplate.innerHTML = `
  <style>
    /* Add your CSS styles here */
    .search-widget {
      display: flex;
      padding: 10px;
    }
    .search-input {
      flex: 1;
      padding: 5px;
      margin-right: 5px;
      font-size: 16px;
      border: 1px solid #ccc;
    }
    .search-button {
      padding: 5px 15px;
      font-size: 16px;
      border: none;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }
  </style>
  <div class="search-widget">
    <input type="search" placeholder="Search products..." class="search-input" />
    <button class="search-button">Search</button>
  </div>
`;

export default class SearchWidget extends HTMLElement {
  static tagName = "search-widget";
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(searchWidgetTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".search-button").addEventListener(
      "click",
      this.handleSearch.bind(this),
    );
    this.shadowRoot.querySelector(".search-input").addEventListener(
      "keypress",
      (e) => {
        if (e.key === "Enter") {
          this.handleSearch();
        }
      },
    );
  }

  handleSearch() {
    const searchInput = this.shadowRoot.querySelector(".search-input");
    const searchTerm = searchInput.value.trim();

    // Emit a custom event with the search term
    const event = new CustomEvent("search-initiated", {
      detail: { searchTerm },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}
