export class Cart {
  constructor() {
    this.items = {};
  }

  add(product, amount = 1) {
    const existingProduct = this.items[product.id];
    if (existingProduct) {
      this.items[product.id].amount += amount;
      return;
    }
    this.items[product.id] = {
      product,
      amount,
    };
  }
}
