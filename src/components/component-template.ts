import { LitElement, css, html } from "lit";

class Component extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
  render() {
    return html` <div>My component</div> `;
  }
}
//Do not register this
// customElements.define("gpt-xxxx", Component);
