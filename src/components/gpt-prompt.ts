import { LitElement, css, html } from "lit";
import { ChangeEvent } from "react";
import { createEvent } from "../lib/api";
import { eventbus } from "../lib/eventbus";

class Component extends LitElement {
  static get properties() {
    return {
      response: { type: String },
      prompt: { type: String },
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }
      textarea {
        width: 100%;
        padding: 10px;
      }
    `;
  }
  updatePrompt(event: ChangeEvent<HTMLTextAreaElement>) {
    this.prompt = event.target.value;
  }
  sendPrompt() {
    createEvent(this.prompt).then(async (response) => {
      eventbus.emit("calendar:new", {
        ...JSON.parse(response.choices[0].message.content),
        fromAI: true,
      });
      this.shadowRoot.querySelector("textarea").innerHTML = "";
    });
  }
  render() {
    return html`
      <div>
        <textarea
          placeholder="What do you wanna do ?"
          @change=${this.updatePrompt}
        ></textarea>
        <div>
          <gpt-button @click=${this.sendPrompt}>Create!</gpt-button>
        </div>
        <div id="response">Response: ${this.response}</div>
      </div>
    `;
  }
}

customElements.define("gpt-prompt", Component);
