import "./globals.css";
import "@fortawesome/fontawesome-free/js/all.js";
import Core from "./core/core";
import { default as Page } from "./pages/ProductListingPage/ProductListingPage";
import { UserService } from "./models/user";
import RouterHandler from "./router/router-handler";
import { ProductService } from "./models/product";

window.services = {
  userService: new UserService(),
  productService: new ProductService(),
};

window.core = Core;

const routeHandler = RouterHandler.instance;
routeHandler.init();
window.router = routeHandler.router;
