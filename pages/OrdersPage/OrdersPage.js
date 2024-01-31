import ordersPageHTML from "./OrdersPage.html?raw";

export default class OrdersPageComponent extends HTMLElement {
  static tagName = "orders-page-component";
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("connected");
    this.innerHTML = ordersPageHTML;
  }
}
