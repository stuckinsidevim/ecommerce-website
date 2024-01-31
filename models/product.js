export class Product {
  constructor(id, name, urls, company, price, description) {
    this.id = id;
    this.name = name;
    this.urls = urls;
    this.company = company;
    this.price = price;
    this.description = description;
  }
}

export class ProductService {
  async getProducts() {
    const response = await fetch("../data.json");
    const products = await response.json();
    return products.map(({ id, name, url, company, price, description }) =>
      new Product(id, name, url, company, price, description)
    );
  }

  async getProduct(id) {
    const products = await this.getProducts();
    const product = products.find((p) => p.id === id);
    return product;
  }
}
