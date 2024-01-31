import Carousel from "@oom/carousel/src/carousel";
import FooterComponent from "../components/Footer/Footer";
import HeaderComponent from "../components/Header/Header";
import ProductCardComponent from "../components/ProductCard/ProductCard";
import ProductListComponent from "../components/ProductList/ProductList";
import SignInFormComponent from "../components/SignInForm/SignInForm";
import SignUpFormComponent from "../components/SignUpForm/SignUpForm";
import CartPageComponent from "../pages/CartPage/CartPage";
import OrdersPageComponent from "../pages/OrdersPage/OrdersPage";
import ProductDetailsPageComponent from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductListingPageComponent from "../pages/ProductListingPage/ProductListingPage";
import SignInPageComponent from "../pages/SignInPage/SignInPage";
import SignUpPageComponent from "../pages/SignUpPage/SignUpPage";
import ComponentRegistry from "./component-registry";

Carousel.tagName = "my-carousel";
const components = [
  FooterComponent,
  HeaderComponent,
  ProductCardComponent,
  ProductListComponent,
  SignInFormComponent,
  SignUpFormComponent,
  Carousel,
  // -- pages --
  ProductListingPageComponent,
  SignUpPageComponent,
  SignInPageComponent,
  ProductDetailsPageComponent,
  CartPageComponent,
  OrdersPageComponent,
];

class Core {
  constructor() {
    if (!Core.instance) {
      Core.instance = this;
    }

    ComponentRegistry.register(components);
    return Core.instance;
  }

  getComponent(tag) {
    return components.find((c) => c.tagName === tag);
  }
}

const instance = new Core();
Object.freeze(instance);

export default instance;
