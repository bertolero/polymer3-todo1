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
		const onDeleteTodoItem = new CustomEvent('on-delete-todo-item', {
			detail: { id: id },
			bubbles: true,
			composed: true
		});
		console.debug('todo item trigger on-delete-todo-item event');
		console.debug(onDeleteTodoItem);
		this.dispatchEvent(onDeleteTodoItem);
	}

	onChangeTodoItem(id) {
		const onChangedTodoItem = new CustomEvent('on-change-todo-item', {
			detail: { id: id },
			bubbles: true,
			composed: true
		});
		console.debug('todo item trigger on-change-todo-item event');
		console.debug(onChangedTodoItem);
		this.dispatchEvent(onChangedTodoItem);
		this.requestUpdate();
	}

	render() {
		return html`
			<li>
				<input
					type="checkbox"
					.checked="${this.item.done}"
					@click="${this.onChangeTodoItem.bind(this, this.item.id)}"
				/>
				${this.item.value}
				<button
					@click="${this.onDeleteTodoItem.bind(this, this.item.id)}"
				></button>
			</li>
		`;
	}
}

customElements.define('todo-item', TodoItem);
