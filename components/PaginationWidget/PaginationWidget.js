import paginationWidgetHTML from "./PaginationWidget.html?raw";
export default class PaginationWidget extends HTMLElement {
  static tagName = "pagination-widget";
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = paginationWidgetHTML;
    this.shadowRoot.appendChild(
      template.content.cloneNode(true),
    );
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["page-size", "total-items", "current-page"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const pageSize = parseInt(this.getAttribute("page-size")) || 10;
    const totalItems = parseInt(this.getAttribute("total-items")) || 0;
    const totalPages = Math.ceil(totalItems / pageSize);
    const currentPage = parseInt(this.getAttribute("current-page")) || 1;

    const paginationContainer = this.shadowRoot.querySelector(".pagination");
    paginationContainer.innerHTML = "";

    // 'Previous' button
    paginationContainer.appendChild(
      this.createPageButton(currentPage - 1, "<", false),
    );

    // Always show the first page
    paginationContainer.appendChild(
      this.createPageButton(1, "1", currentPage === 1),
    );

    let startPage = Math.max(currentPage - 1, 2);
    let endPage = Math.min(currentPage + 1, totalPages - 1);

    // Adjust the start and end page if current page is at the beginning or end
    if (currentPage === 1) {
      startPage = 2;
      endPage = Math.min(4, totalPages - 1);
    } else if (currentPage === totalPages) {
      startPage = Math.max(totalPages - 3, 2);
      endPage = totalPages - 1;
    }

    // Ellipsis after the first page if needed
    if (startPage > 2) {
      paginationContainer.appendChild(
        this.createPageButton(startPage - 1, "...", false),
      );
    }

    // Middle page buttons
    for (let page = startPage; page <= endPage; page++) {
      paginationContainer.appendChild(
        this.createPageButton(page, page.toString(), currentPage === page),
      );
    }

    // Ellipsis before the last page if needed
    if (endPage < totalPages - 1) {
      paginationContainer.appendChild(
        this.createPageButton(endPage + 1, "...", false),
      );
    }

    // Always show the last page
    if (totalPages > 1) {
      paginationContainer.appendChild(
        this.createPageButton(
          totalPages,
          totalPages.toString(),
          currentPage === totalPages,
        ),
      );
    }

    // 'Next' button
    paginationContainer.appendChild(
      this.createPageButton(currentPage + 1, ">", currentPage === totalPages),
    );
  }

  createPageButton(page, text = page, isActive = false) {
    const pageButton = document.createElement("li");
    pageButton.innerText = text;
    if (isActive) {
      pageButton.classList.add("active");
      pageButton.setAttribute("aria-current", "page"); // Accessibility enhancement
      pageButton.style.pointerEvents = "none"; // Prevent clicking on the current page
    } else {
      pageButton.onclick = () => this.selectPage(page);
    }
    return pageButton;
  }

  selectPage(pageNumber) {
    // Avoid selecting out of range pages
    const totalPages = Math.ceil(
      parseInt(this.getAttribute("total-items")) /
        parseInt(this.getAttribute("page-size")),
    );
    if (pageNumber < 1 || pageNumber > totalPages) return;

    // Set the current page and re-render
    this.setAttribute("current-page", pageNumber.toString());
    this.render();

    // Dispatch the custom event
    const pageSelectedEvent = new CustomEvent("page-selected", {
      detail: { pageNumber },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(pageSelectedEvent);
  }
}
