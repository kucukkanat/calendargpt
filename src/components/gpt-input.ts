import { LitElement, css, html } from "lit";

class Component extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      input {
        padding: 10px;
        font-size: 14px;
      }
    `;
  }
  render() {
    const { props } = this;
    return html` <input {...props}>My component</div> `;
  }
}

customElements.define("gpt-input", Component);
