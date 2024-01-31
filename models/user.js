import { Cart } from "./cart";

export class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.cart = new Cart();
  }
}

export class UserService {
  getUsers() {
    return JSON.parse(localStorage.getItem("users")) ?? [];
  }

  checkIfExists(email) {
    const users = this.getUsers();
    const user = users.find((user) => user.email === email);
    return user;
  }

  login(email, password) {
    const users = this.getUsers();
    const user = users.find((user) =>
      user.email === email && user.password === password
    );
    return user;
  }

  signup(email, password) {
    const users = this.getUsers();
    const user = users.find((user) => user.email === email);
    if (user !== undefined) {
      alert("The email is already registered");
      return;
    }
    users.push(new User(email, password));
    localStorage.setItem("users", JSON.stringify(users));
  }
}
