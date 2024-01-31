import Navigo from "navigo";
//---- components ----
import ProductListingPageComponent from "../pages/ProductListingPage/ProductListingPage";
import SignInPageComponent from "../pages/SignInPage/SignInPage";
import SignUpPageComponent from "../pages/SignUpPage/SignUpPage";
import CartPageComponent from "../pages/CartPage/CartPage";
import OrdersPageComponent from "../pages/OrdersPage/OrdersPage";
import ProductDetailsPageComponent from "../pages/ProductDetailsPage/ProductDetailsPage";
//--------------------

const routes = [
  { path: "/sign-in", resolve: SignInPageComponent },
  { path: "/sign-up", resolve: SignUpPageComponent },
  { path: /products\/(\d+)/, resolve: ProductDetailsPageComponent },
  { path: "/products", resolve: ProductListingPageComponent },
  { path: "/cart", resolve: CartPageComponent },
  { path: "/orders", resolve: OrdersPageComponent },
];

class RouterHandler {
  static _instance = null;

  constructor() {
    if (RouterHandler._instance) {
      throw new Error("Use RouterHandler.getInstance() instead of new.");
    }

    RouterHandler._instance = this;

    this.router = new Navigo("/");
  }

  static get instance() {
    if (!RouterHandler._instance) {
      RouterHandler._instance = new RouterHandler();
    }
    return RouterHandler._instance;
  }

  static inject(component) {
    const body = document.querySelector("body");
    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
    body.appendChild(component);
  }

  init() {
    this.router.on(() => {
      RouterHandler.inject(new ProductListingPageComponent());
    }).resolve();

    routes.forEach((route) => {
      this.router.on(
        route.path,
        (params) => {
          RouterHandler.inject(new route.resolve(params));
        },
        {
          before: (done, params) => {
            if (!route.canActivate || route.canActivate()) {
              done();
            } else {
              this.router.navigate("/");
              done(false);
            }
          },
        },
      ).resolve();
    });
  }
}

export default RouterHandler;
