import { LitElement, css, html } from "lit";

class Component extends LitElement {
  static get styles() {
    return css`
      :host {
        /* display: block; */
      }
      button {
        padding: 10px 20px;
        font-size: 1.5em;
        border: 1px solid #ddd;
        border-radius: 0.5em;
      }
    `;
  }
  clicked(event: Event) {
    this.dispatchEvent(new CustomEvent("click", { detail: event }));
  }
  render() {
    return html`<button>
      <slot></slot>
    </button>`;
  }
}

customElements.define("gpt-button", Component);
