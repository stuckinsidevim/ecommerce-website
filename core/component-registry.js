export default class ComponentRegistry {
  static register(components) {
    components.forEach((component) => {
      window.customElements.define(component.tagName, component);
    });
  }
}
