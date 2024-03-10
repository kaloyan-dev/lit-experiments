import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-option")
export class LitOption extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      display: block;
    }

    :host * {
      margin: 0;
      padding: 0;
    }

    .option a {
      padding: 10px 20px;
      display: block;
      color: #fff;
      text-decoration: none;
      white-space: nowrap;
    }

    .option a:hover {
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    }

    .option a:active {
      font-weight: bold;
    }
  `;

  // Declare reactive properties
  @property()
  link?: string = "#";

  // Render the UI as a function of component state
  render() {
    const optionText = this.textContent?.trim() || "[Option Text]";
    return html`<div class="option">
      <a href="${this.link}">${optionText}</a>
    </div>`;
  }
}
