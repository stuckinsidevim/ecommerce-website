export default class FilterWidget extends HTMLElement {
  static tagName = "filter-widget";
  constructor() {
    super();
    this._filterData = [];
    this.attachShadow({ mode: "open" });
    // Default structure for the widget without specific filter options
    this.shadowRoot.innerHTML = `
      <style>
        /* General styles for the filter */
      </style>
      <div id="filters-container">
        <!-- Filters will be dynamically injected here -->
      </div>
    `;
  }

  connectedCallback() {
    this.renderFilters();
  }

  // Observe attribute changes for 'filter-data'
  static get observedAttributes() {
    return ["filter-data"];
  }

  // Respond to attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "filter-data") {
      this._filterData = JSON.parse(newValue);
      this.renderFilters();
    }
  }

  set filterData(filters) {
    this.setAttribute("filter-data", JSON.stringify(filters));
  }

  // Helper method to get current filters
  get filterData() {
    return this._filterData;
  }

  renderFilters() {
    const container = this.shadowRoot.querySelector("#filters-container");
    container.innerHTML = ""; // Clear any existing filters

    this.filterData.forEach((filter) => {
      const filterContainer = document.createElement("div");
      filterContainer.classList.add("filter-container");

      const label = document.createElement("label");
      label.textContent = filter.label;
      label.htmlFor = `filter-${filter.type}`;

      const select = document.createElement("select");
      select.id = `filter-${filter.type}`;
      select.name = filter.type;

      // Add a default option
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = `Select a ${filter.type}`;
      select.appendChild(defaultOption);

      // Add filter options
      filter.options.forEach((optionValue) => {
        const option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionValue;
        select.appendChild(option);
      });

      select.addEventListener(
        "change",
        this.handleFilterChange.bind(this, filter.type),
      );

      filterContainer.appendChild(label);
      filterContainer.appendChild(select);
      container.appendChild(filterContainer);
    });
  }

  handleFilterChange(filterType, event) {
    const selectedValue = event.target.value;
    this.dispatchEvent(
      new CustomEvent("filter-changed", {
        bubbles: true,
        composed: true,
        detail: {
          filterType: filterType,
          value: selectedValue,
        },
      }),
    );
  }
}
