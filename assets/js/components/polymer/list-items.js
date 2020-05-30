import { LitElement } from 'lit-element';
import { html } from 'lit-html';

export class ListItems extends LitElement {
	constructor() {
		super();
		this.todoList = [];
	}

	static get properties() {
		return {
			todoList: { type: Array }
		};
	}

	printTodoItems() {
		return this.todoList.map((todo) => {
			return html` <li>${todo.value}</li> `;
		});
	}

	render() {
		return html`
			<ul>
				${this.printTodoItems()}
			</ul>
		`;
	}
}

customElements.define('list-items', ListItems);
