import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-dropdown")
export class LitDropdown extends LitElement {
  // Declare reactive properties
  @property() name?: string = "Dropdown";
  @property() open?: boolean = false;
  @property() position?: string = "bottom";
  @property() color?: string = "blue";

  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      display: inline-block;
    }

    :host * {
      margin: 0;
      padding: 0;
      user-select: none;
    }

    :host h3 {
      font-weight: normal;
      padding: 5px 20px;
    }

    .select {
      cursor: pointer;
      color: #fff;
      border-radius: 6px;
      position: relative;
    }

    .select.select-red {
      background-color: #b91c1c;
    }

    .select.select-green {
      background-color: #15803d;
    }

    .select.select-blue {
      background-color: #1d4ed8;
    }

    .select.select-yellow {
      background-color: #eab308;
    }

    .select .options {
      position: absolute;
      background-color: inherit;
      border-radius: 6px;
      overflow: hidden;
      min-width: 100%;
      z-index: 10;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    }

    .select .options.options-top {
      bottom: calc(100% + 5px);
      left: 0;
    }

    .select .options.options-bottom {
      top: calc(100% + 5px);
      left: 0;
    }

    .select .options.options-left {
      right: calc(100% + 5px);
      top: 0;
    }

    .select .options.options-right {
      left: calc(100% + 5px);
      top: 0;
    }
  `;

  outerClick = (event: MouseEvent) => {
    const eventTarget = event.target as HTMLElement;

    if (!this.contains(eventTarget)) {
      this.open = false;
    }
  };

  selectClass = () => {
    let color = this.color || "blue";

    if (!["blue", "green", "red", "yellow"].includes(color)) {
      color = "blue";
    }

    return "select-" + color;
  };

  optionsClass = () => {
    let position = this.position || "bottom";

    if (!["top", "bottom", "left", "right"].includes(position)) {
      position = "bottom";
    }

    return "options-" + position;
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.outerClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.outerClick);
  }

  // Render the UI as a function of component state
  render() {
    return html`<div
      class="select ${this.selectClass()}"
      @click="${() => {
        this.open = !this.open;
      }}"
      @focusout="${() => {
        this.open = false;
      }}"
    >
      <h3>${this.name}</h3>
      <div class="options ${this.optionsClass()}">
        ${this.open ? html`<slot></slot>` : ""}
      </div>
    </div>`;
  }
}
