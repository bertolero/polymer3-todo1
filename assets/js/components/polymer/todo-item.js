import { LitElement } from 'lit-element';
import { html } from 'lit-html';

export class TodoItem extends LitElement {
	constructor() {
		super();
		this.item = {};
	}

	static get properties() {
		return {
			item: { type: Object }
		};
	}

	render() {
		return html` <li>${this.item.value}</li> `;
	}
}

customElements.define('todo-item', TodoItem);
