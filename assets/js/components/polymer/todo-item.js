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

	onDeleteTodoItem(id) {
		console.debug(id);

		const onDeleteTodoItem = new CustomEvent('on-delete-todo-item', {
			detail: { id: id },
			bubbles: true,
			composed: true
		});
		console.debug('todo item trigger on-delete-todo-item event');
		console.debug(onDeleteTodoItem);
		this.dispatchEvent(onDeleteTodoItem);
	}

	render() {
		return html`
			<li>${this.item.value}</li>
			<button
				@click="${this.onDeleteTodoItem.bind(this, this.item.id)}"
			></button>
		`;
	}
}

customElements.define('todo-item', TodoItem);
